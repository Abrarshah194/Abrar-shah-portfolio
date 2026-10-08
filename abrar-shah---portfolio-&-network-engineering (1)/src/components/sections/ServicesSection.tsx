import React from 'react';
import { Network, Activity, Server, Wrench, Globe, ArrowRight, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface ServicesSectionProps {
  onSelectService?: (title: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { data } = usePortfolio();
  const services = data?.services || [];

  const getServiceIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'network':
        return <Network className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'server':
        return <Server className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'globe':
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            03 / Professional Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Network & Technical Support
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Professional technical services tailored for small-to-medium offices, academic campuses, and infrastructure setups.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Features Checklist */}
                {service.features && service.features.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Deliverables Included:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/60">
                <button
                  onClick={() => handleInquire(service.title)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1 transition-colors cursor-pointer group-hover:translate-x-0.5"
                >
                  <span>Inquire for this Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
