import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { PrivacyTermsModal } from './components/common/PrivacyTermsModal';

// Public sections
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { BlogSection } from './components/sections/BlogSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';

// Admin views
import { AdminLayout, type AdminTab } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProfile } from './components/admin/AdminProfile';
import { AdminEducation } from './components/admin/AdminEducation';
import { AdminExperience } from './components/admin/AdminExperience';
import { AdminSkills } from './components/admin/AdminSkills';
import { AdminServices } from './components/admin/AdminServices';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminCertificates } from './components/admin/AdminCertificates';
import { AdminBlog } from './components/admin/AdminBlog';
import { AdminTestimonials } from './components/admin/AdminTestimonials';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSocialLinks } from './components/admin/AdminSocialLinks';
import { AdminMedia } from './components/admin/AdminMedia';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminSecurity } from './components/admin/AdminSecurity';

import { ToastProvider as CustomToastProvider } from './components/common/Toast';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data } = usePortfolio();

  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return 'admin';
    }
    return 'public';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPrivacyTermsOpen, setIsPrivacyTermsOpen] = useState(false);

  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState<string>('');

  // Handle browser back/forward and path change
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic document title and JSON-LD structured data
  useEffect(() => {
    if (!data) return;

    if (currentView === 'admin') {
      document.title = 'Admin CMS Dashboard | Exporton Networks';
      return;
    }

    const title = data.settings.metaTitle || `${data.profile.name} - ${data.profile.title}`;
    document.title = title;

    // Inject Person & WebSite JSON-LD
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.profile.name,
      jobTitle: data.profile.title,
      worksFor: {
        '@type': 'Organization',
        name: data.profile.brandName
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Abdul Wali Khan University Mardan (AWKUM)'
      },
      description: data.profile.headline,
      email: data.profile.email,
      url: window.location.origin
    };

    let scriptTag = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(personSchema);
  }, [data, currentView]);

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    window.history.pushState({}, '', '/admin');
  };

  const handleReturnToPublic = () => {
    setCurrentView('public');
    window.history.pushState({}, '', '/');
  };

  // If in Admin view
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-mono text-xs">
          Authenticating administrator session...
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setAdminTab('dashboard')}
          onBackToSite={handleReturnToPublic}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onReturnToPublic={handleReturnToPublic}
      >
        {adminTab === 'dashboard' && <AdminDashboard onNavigateTab={setAdminTab} />}
        {adminTab === 'profile' && <AdminProfile />}
        {adminTab === 'education' && <AdminEducation />}
        {adminTab === 'experience' && <AdminExperience />}
        {adminTab === 'skills' && <AdminSkills />}
        {adminTab === 'services' && <AdminServices />}
        {adminTab === 'projects' && <AdminProjects />}
        {adminTab === 'certificates' && <AdminCertificates />}
        {adminTab === 'blog' && <AdminBlog />}
        {adminTab === 'testimonials' && <AdminTestimonials />}
        {adminTab === 'messages' && <AdminMessages />}
        {adminTab === 'social-links' && <AdminSocialLinks />}
        {adminTab === 'media' && <AdminMedia />}
        {adminTab === 'settings' && <AdminSettings />}
        {adminTab === 'security' && <AdminSecurity />}
      </AdminLayout>
    );
  }

  // Public Portfolio View
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateAdmin={handleNavigateAdmin}
      />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection onSelectService={(title) => setSelectedServiceInquiry(title)} />
        <ProjectsSection
          selectedSlug={selectedProjectSlug}
          onClearSlug={() => setSelectedProjectSlug(null)}
        />
        <EducationSection />
        <ExperienceSection />
        <CertificatesSection />
        <ResumeSection />
        <BlogSection
          selectedSlug={selectedBlogSlug}
          onClearSlug={() => setSelectedBlogSlug(null)}
        />
        <TestimonialsSection />
        <ContactSection initialSubject={selectedServiceInquiry} />
      </main>

      <Footer
        onOpenPrivacyTerms={() => setIsPrivacyTermsOpen(true)}
        onNavigateAdmin={handleNavigateAdmin}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={(slug) => {
          setSelectedProjectSlug(slug);
          const el = document.getElementById('projects');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectBlog={(slug) => {
          setSelectedBlogSlug(slug);
          const el = document.getElementById('blog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <PrivacyTermsModal
        isOpen={isPrivacyTermsOpen}
        onClose={() => setIsPrivacyTermsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CustomToastProvider>
        <AuthProvider>
          <PortfolioProvider>
            <MainApp />
          </PortfolioProvider>
        </AuthProvider>
      </CustomToastProvider>
    </ThemeProvider>
  );
}
