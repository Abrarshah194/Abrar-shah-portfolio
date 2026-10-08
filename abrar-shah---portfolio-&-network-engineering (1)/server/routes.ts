import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { requireAuth, generateToken, verifyUserPassword, type AuthenticatedRequest } from './auth';
import type {
  User,
  ContactMessage,
  Education,
  Experience,
  Skill,
  Service,
  Project,
  Certificate,
  BlogPost,
  Testimonial,
  SocialLink,
  MediaItem
} from '../src/types';

export const router = express.Router();

// Multer storage setup for Media uploads
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `file-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|pdf|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, png, webp, svg, gif) and PDF documents are allowed'));
    }
  }
});

// Simple in-memory rate limiting map for login and contact form
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count += 1;
  return true;
}

// -----------------------------------------------------------------------------
// PUBLIC ENDPOINTS
// -----------------------------------------------------------------------------

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/portfolio', (_req: Request, res: Response) => {
  try {
    const portfolio = db.getPublicPortfolio();
    res.json({
      success: true,
      message: 'Portfolio data retrieved successfully',
      data: portfolio
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio data',
      errors: [err instanceof Error ? err.message : String(err)]
    });
  }
});

router.get('/projects', (_req: Request, res: Response) => {
  const data = db.getData();
  res.json({
    success: true,
    data: data.projects.sort((a, b) => a.order - b.order)
  });
});

router.get('/projects/:slug', (req: Request, res: Response) => {
  const data = db.getData();
  const project = data.projects.find(p => p.slug === req.params.slug);
  if (!project) {
    res.status(404).json({ success: false, message: 'Project not found' });
    return;
  }
  res.json({ success: true, data: project });
});

router.get('/blog', (_req: Request, res: Response) => {
  const data = db.getData();
  const published = data.blogPosts
    .filter(b => b.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  res.json({ success: true, data: published });
});

router.get('/blog/:slug', (req: Request, res: Response) => {
  const data = db.getData();
  const post = data.blogPosts.find(b => b.slug === req.params.slug && b.isPublished);
  if (!post) {
    res.status(404).json({ success: false, message: 'Blog post not found' });
    return;
  }
  // Increment view count
  post.views = (post.views || 0) + 1;
  db.save();
  res.json({ success: true, data: post });
});

// Contact message submission
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000)
});

router.post('/contact', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(`contact:${clientIp}`, 10, 60 * 1000)) {
    res.status(429).json({
      success: false,
      message: 'Too many messages submitted. Please wait a minute before trying again.'
    });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.issues.map(e => e.message)
    });
    return;
  }

  const data = db.getData();
  if (!data.settings.allowContactForm) {
    res.status(403).json({
      success: false,
      message: 'Contact form submissions are currently disabled by the administrator.'
    });
    return;
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || '',
    subject: parsed.data.subject,
    message: parsed.data.message,
    isRead: false,
    isArchived: false,
    createdAt: new Date().toISOString()
  };

  data.messages.unshift(newMessage);
  db.save();

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received. Abrar Shah will get back to you shortly.'
  });
});

// -----------------------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// -----------------------------------------------------------------------------

router.post('/auth/login', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(`login:${clientIp}`, 8, 60 * 1000)) {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please wait one minute before retrying.'
    });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  const user = await verifyUserPassword(email, password);
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
    return;
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Update last login
  const data = db.getData();
  const dbUser = data.users.find(u => u.id === user.id);
  if (dbUser) {
    dbUser.lastLoginAt = new Date().toISOString();
    db.save();
  }

  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user
    }
  });
});

router.post('/auth/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    return;
  }

  const data = db.getData();
  const existingUser = data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (existingUser) {
    res.status(409).json({ success: false, message: 'An admin account with this email already exists' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser: User & { passwordHash: string } = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase().trim(),
    name: name.trim(),
    role: 'admin',
    passwordHash,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  data.users.push(newUser);
  db.save();

  const token = generateToken({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role
  });

  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    data: {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    }
  });
});

router.post('/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

router.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const user = data.users.find(u => u.id === req.user?.userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      lastLoginAt: user.lastLoginAt
    }
  });
});

router.post('/auth/change-password', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    res.status(400).json({
      success: false,
      message: 'New password must be at least 8 characters long.'
    });
    return;
  }

  const data = db.getData();
  const user = data.users.find(u => u.id === req.user?.userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  const matches = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!matches) {
    res.status(400).json({ success: false, message: 'Current password does not match.' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  db.save();

  res.json({ success: true, message: 'Password updated successfully.' });
});

// -----------------------------------------------------------------------------
// ADMIN CRUD ENDPOINTS (Protected with requireAuth)
// -----------------------------------------------------------------------------

// Dashboard Stats
router.get('/admin/stats', requireAuth, (_req: Request, res: Response) => {
  const data = db.getData();
  const unreadMessages = data.messages.filter(m => !m.isRead).length;

  res.json({
    success: true,
    data: {
      totalProjects: data.projects.length,
      publishedBlogPosts: data.blogPosts.filter(b => b.isPublished).length,
      totalCertificates: data.certificates.length,
      totalSkills: data.skills.length,
      totalServices: data.services.length,
      totalMessages: data.messages.length,
      unreadMessages,
      recentMessages: data.messages.slice(0, 5),
      recentProjects: data.projects.slice(0, 4)
    }
  });
});

// Profile & Settings
router.put('/admin/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.profile = {
    ...data.profile,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  db.save();
  res.json({ success: true, message: 'Profile updated successfully', data: data.profile });
});

router.put('/admin/settings', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.settings = {
    ...data.settings,
    ...req.body
  };
  db.save();
  res.json({ success: true, message: 'Website settings updated successfully', data: data.settings });
});

// Education CRUD
router.post('/admin/education', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newEdu: Education = {
    id: `edu-${Date.now()}`,
    order: data.education.length + 1,
    ...req.body
  };
  data.education.push(newEdu);
  db.save();
  res.status(201).json({ success: true, message: 'Education record created', data: newEdu });
});

router.put('/admin/education/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.education.findIndex(e => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Education record not found' });
    return;
  }
  data.education[idx] = { ...data.education[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Education record updated', data: data.education[idx] });
});

router.delete('/admin/education/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.education = data.education.filter(e => e.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Education record deleted' });
});

// Experience CRUD
router.post('/admin/experience', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newExp: Experience = {
    id: `exp-${Date.now()}`,
    order: data.experience.length + 1,
    skills: Array.isArray(req.body.skills) ? req.body.skills : [],
    ...req.body
  };
  data.experience.push(newExp);
  db.save();
  res.status(201).json({ success: true, message: 'Experience record created', data: newExp });
});

router.put('/admin/experience/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.experience.findIndex(e => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Experience record not found' });
    return;
  }
  data.experience[idx] = { ...data.experience[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Experience record updated', data: data.experience[idx] });
});

router.delete('/admin/experience/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.experience = data.experience.filter(e => e.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Experience record deleted' });
});

// Skills CRUD
router.post('/admin/skills', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newSkill: Skill = {
    id: `sk-${Date.now()}`,
    order: data.skills.length + 1,
    ...req.body
  };
  data.skills.push(newSkill);
  db.save();
  res.status(201).json({ success: true, message: 'Skill created', data: newSkill });
});

router.put('/admin/skills/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.skills.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Skill not found' });
    return;
  }
  data.skills[idx] = { ...data.skills[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Skill updated', data: data.skills[idx] });
});

router.delete('/admin/skills/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.skills = data.skills.filter(s => s.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Skill deleted' });
});

// Services CRUD
router.post('/admin/services', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newService: Service = {
    id: `srv-${Date.now()}`,
    order: data.services.length + 1,
    features: Array.isArray(req.body.features) ? req.body.features : [],
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    ...req.body
  };
  data.services.push(newService);
  db.save();
  res.status(201).json({ success: true, message: 'Service created', data: newService });
});

router.put('/admin/services/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.services.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Service not found' });
    return;
  }
  data.services[idx] = { ...data.services[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Service updated', data: data.services[idx] });
});

router.delete('/admin/services/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.services = data.services.filter(s => s.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Service deleted' });
});

// Projects CRUD
router.post('/admin/projects', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    order: data.projects.length + 1,
    gallery: Array.isArray(req.body.gallery) ? req.body.gallery : [],
    technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
    features: Array.isArray(req.body.features) ? req.body.features : [],
    status: req.body.status || 'Learning Project',
    isFeatured: !!req.body.isFeatured,
    ...req.body
  };
  // Ensure slug exists
  if (!newProject.slug) {
    newProject.slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  data.projects.push(newProject);
  db.save();
  res.status(201).json({ success: true, message: 'Project created', data: newProject });
});

router.put('/admin/projects/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Project not found' });
    return;
  }
  data.projects[idx] = { ...data.projects[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Project updated', data: data.projects[idx] });
});

router.delete('/admin/projects/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.projects = data.projects.filter(p => p.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Project deleted' });
});

// Certificates CRUD
router.post('/admin/certificates', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newCert: Certificate = {
    id: `cert-${Date.now()}`,
    order: data.certificates.length + 1,
    ...req.body
  };
  data.certificates.push(newCert);
  db.save();
  res.status(201).json({ success: true, message: 'Certificate created', data: newCert });
});

router.put('/admin/certificates/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.certificates.findIndex(c => c.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Certificate not found' });
    return;
  }
  data.certificates[idx] = { ...data.certificates[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Certificate updated', data: data.certificates[idx] });
});

router.delete('/admin/certificates/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.certificates = data.certificates.filter(c => c.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Certificate deleted' });
});

// Blog CRUD (Includes draft posts)
router.get('/admin/blog', requireAuth, (_req: Request, res: Response) => {
  const data = db.getData();
  res.json({ success: true, data: data.blogPosts });
});

router.post('/admin/blog', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newPost: BlogPost = {
    id: `post-${Date.now()}`,
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    views: 0,
    publishedAt: req.body.publishedAt || new Date().toISOString(),
    author: req.body.author || data.profile.name,
    readTimeMinutes: req.body.readTimeMinutes || 3,
    ...req.body
  };
  if (!newPost.slug) {
    newPost.slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  data.blogPosts.unshift(newPost);
  db.save();
  res.status(201).json({ success: true, message: 'Blog post created', data: newPost });
});

router.put('/admin/blog/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.blogPosts.findIndex(b => b.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Blog post not found' });
    return;
  }
  data.blogPosts[idx] = { ...data.blogPosts[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Blog post updated', data: data.blogPosts[idx] });
});

router.delete('/admin/blog/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.blogPosts = data.blogPosts.filter(b => b.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Blog post deleted' });
});

// Testimonials CRUD
router.get('/admin/testimonials', requireAuth, (_req: Request, res: Response) => {
  const data = db.getData();
  res.json({ success: true, data: data.testimonials });
});

router.post('/admin/testimonials', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newTestimonial: Testimonial = {
    id: `test-${Date.now()}`,
    order: data.testimonials.length + 1,
    rating: req.body.rating || 5,
    isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    ...req.body
  };
  data.testimonials.push(newTestimonial);
  db.save();
  res.status(201).json({ success: true, message: 'Testimonial created', data: newTestimonial });
});

router.put('/admin/testimonials/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.testimonials.findIndex(t => t.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Testimonial not found' });
    return;
  }
  data.testimonials[idx] = { ...data.testimonials[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Testimonial updated', data: data.testimonials[idx] });
});

router.delete('/admin/testimonials/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.testimonials = data.testimonials.filter(t => t.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Testimonial deleted' });
});

// Social Links CRUD
router.post('/admin/social-links', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const newSocial: SocialLink = {
    id: `soc-${Date.now()}`,
    order: data.socialLinks.length + 1,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    ...req.body
  };
  data.socialLinks.push(newSocial);
  db.save();
  res.status(201).json({ success: true, message: 'Social link created', data: newSocial });
});

router.put('/admin/social-links/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const idx = data.socialLinks.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: 'Social link not found' });
    return;
  }
  data.socialLinks[idx] = { ...data.socialLinks[idx], ...req.body };
  db.save();
  res.json({ success: true, message: 'Social link updated', data: data.socialLinks[idx] });
});

router.delete('/admin/social-links/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.socialLinks = data.socialLinks.filter(s => s.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Social link deleted' });
});

// Contact Messages Admin
router.get('/admin/messages', requireAuth, (_req: Request, res: Response) => {
  const data = db.getData();
  res.json({ success: true, data: data.messages });
});

router.patch('/admin/messages/:id/read', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const msg = data.messages.find(m => m.id === req.params.id);
  if (!msg) {
    res.status(404).json({ success: false, message: 'Message not found' });
    return;
  }
  msg.isRead = !msg.isRead;
  db.save();
  res.json({ success: true, data: msg });
});

router.patch('/admin/messages/:id/archive', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const msg = data.messages.find(m => m.id === req.params.id);
  if (!msg) {
    res.status(404).json({ success: false, message: 'Message not found' });
    return;
  }
  msg.isArchived = !msg.isArchived;
  db.save();
  res.json({ success: true, data: msg });
});

router.delete('/admin/messages/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  data.messages = data.messages.filter(m => m.id !== req.params.id);
  db.save();
  res.json({ success: true, message: 'Message deleted' });
});

// Media Library Management
router.get('/admin/media', requireAuth, (_req: Request, res: Response) => {
  const data = db.getData();
  res.json({ success: true, data: data.media });
});

router.post('/admin/media/upload', requireAuth, upload.single('file'), (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded or file rejected by validator.' });
    return;
  }

  const mediaItem: MediaItem = {
    id: `med-${Date.now()}`,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString()
  };

  const data = db.getData();
  data.media.unshift(mediaItem);
  db.save();

  res.status(201).json({
    success: true,
    message: 'File uploaded successfully',
    data: mediaItem
  });
});

router.delete('/admin/media/:id', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();
  const media = data.media.find(m => m.id === req.params.id);
  if (media) {
    const filePath = path.join(UPLOADS_DIR, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Failed to unlink file:', err);
      }
    }
    data.media = data.media.filter(m => m.id !== req.params.id);
    db.save();
  }
  res.json({ success: true, message: 'Media item deleted' });
});
