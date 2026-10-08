import type {
  PortfolioData,
  Project,
  BlogPost,
  ContactMessage,
  Education,
  Experience,
  Skill,
  Service,
  Certificate,
  Testimonial,
  SocialLink,
  SiteSettings,
  Profile,
  MediaItem,
  ApiResponse
} from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || (data.errors && data.errors[0]) || 'Network response was not ok');
  }
  return data;
}

export const api = {
  // Public APIs
  async getPortfolio(): Promise<ApiResponse<PortfolioData>> {
    const res = await fetch(`${API_BASE}/portfolio`);
    return handleResponse<ApiResponse<PortfolioData>>(res);
  },

  async getProjects(): Promise<ApiResponse<Project[]>> {
    const res = await fetch(`${API_BASE}/projects`);
    return handleResponse<ApiResponse<Project[]>>(res);
  },

  async getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    return handleResponse<ApiResponse<Project>>(res);
  },

  async getBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    const res = await fetch(`${API_BASE}/blog`);
    return handleResponse<ApiResponse<BlogPost[]>>(res);
  },

  async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    const res = await fetch(`${API_BASE}/blog/${slug}`);
    return handleResponse<ApiResponse<BlogPost>>(res);
  },

  async submitContact(formData: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return handleResponse<ApiResponse>(res);
  },

  // Auth APIs
  async login(credentials: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse<{ success: boolean; data: { token: string; user: { id: string; email: string; name: string } } }>(res);
  },

  async register(data: { name: string; email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse<{ success: boolean; data: { token: string; user: { id: string; email: string; name: string } } }>(res);
  },

  async logout(): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{ success: boolean; data: { id: string; email: string; name: string; role: string } }>(res);
  },

  async changePassword(passwords: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(passwords)
    });
    return handleResponse<ApiResponse>(res);
  },

  // Admin Dashboard Stats
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{
      success: boolean;
      data: {
        totalProjects: number;
        publishedBlogPosts: number;
        totalCertificates: number;
        totalSkills: number;
        totalServices: number;
        totalMessages: number;
        unreadMessages: number;
        recentMessages: ContactMessage[];
        recentProjects: Project[];
      };
    }>(res);
  },

  // Admin Profile & Settings
  async updateProfile(profile: Partial<Profile>): Promise<ApiResponse<Profile>> {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(profile)
    });
    return handleResponse<ApiResponse<Profile>>(res);
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<ApiResponse<SiteSettings>> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(settings)
    });
    return handleResponse<ApiResponse<SiteSettings>>(res);
  },

  // Education CRUD
  async createEducation(edu: Omit<Education, 'id' | 'order'>): Promise<ApiResponse<Education>> {
    const res = await fetch(`${API_BASE}/admin/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(edu)
    });
    return handleResponse<ApiResponse<Education>>(res);
  },

  async updateEducation(id: string, edu: Partial<Education>): Promise<ApiResponse<Education>> {
    const res = await fetch(`${API_BASE}/admin/education/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(edu)
    });
    return handleResponse<ApiResponse<Education>>(res);
  },

  async deleteEducation(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/education/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Experience CRUD
  async createExperience(exp: Omit<Experience, 'id' | 'order'>): Promise<ApiResponse<Experience>> {
    const res = await fetch(`${API_BASE}/admin/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(exp)
    });
    return handleResponse<ApiResponse<Experience>>(res);
  },

  async updateExperience(id: string, exp: Partial<Experience>): Promise<ApiResponse<Experience>> {
    const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(exp)
    });
    return handleResponse<ApiResponse<Experience>>(res);
  },

  async deleteExperience(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Skills CRUD
  async createSkill(skill: Omit<Skill, 'id' | 'order'>): Promise<ApiResponse<Skill>> {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(skill)
    });
    return handleResponse<ApiResponse<Skill>>(res);
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<ApiResponse<Skill>> {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(skill)
    });
    return handleResponse<ApiResponse<Skill>>(res);
  },

  async deleteSkill(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Services CRUD
  async createService(srv: Omit<Service, 'id' | 'order'>): Promise<ApiResponse<Service>> {
    const res = await fetch(`${API_BASE}/admin/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(srv)
    });
    return handleResponse<ApiResponse<Service>>(res);
  },

  async updateService(id: string, srv: Partial<Service>): Promise<ApiResponse<Service>> {
    const res = await fetch(`${API_BASE}/admin/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(srv)
    });
    return handleResponse<ApiResponse<Service>>(res);
  },

  async deleteService(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/services/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Projects CRUD
  async createProject(proj: Omit<Project, 'id' | 'order'>): Promise<ApiResponse<Project>> {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(proj)
    });
    return handleResponse<ApiResponse<Project>>(res);
  },

  async updateProject(id: string, proj: Partial<Project>): Promise<ApiResponse<Project>> {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(proj)
    });
    return handleResponse<ApiResponse<Project>>(res);
  },

  async deleteProject(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Certificates CRUD
  async createCertificate(cert: Omit<Certificate, 'id' | 'order'>): Promise<ApiResponse<Certificate>> {
    const res = await fetch(`${API_BASE}/admin/certificates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(cert)
    });
    return handleResponse<ApiResponse<Certificate>>(res);
  },

  async updateCertificate(id: string, cert: Partial<Certificate>): Promise<ApiResponse<Certificate>> {
    const res = await fetch(`${API_BASE}/admin/certificates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(cert)
    });
    return handleResponse<ApiResponse<Certificate>>(res);
  },

  async deleteCertificate(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/certificates/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Blog CRUD
  async getAdminBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    const res = await fetch(`${API_BASE}/admin/blog`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<BlogPost[]>>(res);
  },

  async createBlogPost(post: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    const res = await fetch(`${API_BASE}/admin/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(post)
    });
    return handleResponse<ApiResponse<BlogPost>>(res);
  },

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    const res = await fetch(`${API_BASE}/admin/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(post)
    });
    return handleResponse<ApiResponse<BlogPost>>(res);
  },

  async deleteBlogPost(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Testimonials CRUD
  async getAdminTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    const res = await fetch(`${API_BASE}/admin/testimonials`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<Testimonial[]>>(res);
  },

  async createTestimonial(test: Omit<Testimonial, 'id' | 'order'>): Promise<ApiResponse<Testimonial>> {
    const res = await fetch(`${API_BASE}/admin/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(test)
    });
    return handleResponse<ApiResponse<Testimonial>>(res);
  },

  async updateTestimonial(id: string, test: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
    const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(test)
    });
    return handleResponse<ApiResponse<Testimonial>>(res);
  },

  async deleteTestimonial(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Social Links CRUD
  async createSocialLink(soc: Omit<SocialLink, 'id' | 'order'>): Promise<ApiResponse<SocialLink>> {
    const res = await fetch(`${API_BASE}/admin/social-links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(soc)
    });
    return handleResponse<ApiResponse<SocialLink>>(res);
  },

  async updateSocialLink(id: string, soc: Partial<SocialLink>): Promise<ApiResponse<SocialLink>> {
    const res = await fetch(`${API_BASE}/admin/social-links/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(soc)
    });
    return handleResponse<ApiResponse<SocialLink>>(res);
  },

  async deleteSocialLink(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/social-links/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Messages Manager
  async getMessages(): Promise<ApiResponse<ContactMessage[]>> {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<ContactMessage[]>>(res);
  },

  async toggleMessageRead(id: string): Promise<ApiResponse<ContactMessage>> {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<ContactMessage>>(res);
  },

  async toggleMessageArchive(id: string): Promise<ApiResponse<ContactMessage>> {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/archive`, {
      method: 'PATCH',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<ContactMessage>>(res);
  },

  async deleteMessage(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  },

  // Media Management
  async getMedia(): Promise<ApiResponse<MediaItem[]>> {
    const res = await fetch(`${API_BASE}/admin/media`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse<MediaItem[]>>(res);
  },

  async uploadMedia(file: File): Promise<ApiResponse<MediaItem>> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('admin_token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/admin/media/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    return handleResponse<ApiResponse<MediaItem>>(res);
  },

  async deleteMedia(id: string): Promise<ApiResponse> {
    const res = await fetch(`${API_BASE}/admin/media/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<ApiResponse>(res);
  }
};
