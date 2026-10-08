export type SkillCategory = 'Networking' | 'Programming' | 'Tools' | 'Office' | 'Design';

export interface Profile {
  id: string;
  name: string;
  displayName: string;
  brandName: string;
  title: string;
  headline: string;
  shortBio: string;
  fullBio: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatarUrl: string;
  resumeUrl: string;
  statusTagline: string;
  primaryGoal: string;
  drivingLicense: string;
  interests: string[];
  cgpa: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  marks?: string;
  totalMarks?: string;
  grade?: string;
  cgpa?: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  description?: string;
  order: number;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  skills: string[];
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  iconName?: string;
  description?: string;
  isFeatured: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  isActive: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  gallery: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  status: 'Completed' | 'In Progress' | 'Learning Project';
  isFeatured: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrg: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl: string;
  description: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  readTimeMinutes: number;
  author: string;
  views: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatarUrl?: string;
  message: string;
  rating: number; // 1-5
  isPublished: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  iconName: string;
  isActive: boolean;
  order: number;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  brandName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImageUrl: string;
  canonicalUrl: string;
  analyticsId: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  allowContactForm: boolean;
  defaultTheme: 'system' | 'light' | 'dark';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt: string;
  lastLoginAt?: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  services: Service[];
  projects: Project[];
  certificates: Certificate[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  settings: SiteSettings;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
