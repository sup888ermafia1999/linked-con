import React, { useEffect, useRef, useState } from 'react';
import { 
  HardHat, 
  Building2, 
  Home, 
  RefreshCw, 
  Route, 
  ClipboardList,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: HardHat,
    title: 'General Construction',
    description: 'Full-service building solutions from ground-breaking to final inspection, managing every phase with certified expertise and unwavering attention to detail.',
  },
  {
    icon: Building2,
    title: 'Commercial Building',
    description: 'Office complexes, retail centers, and industrial facilities built to maximize operational efficiency and tenant satisfaction.',
  },
  {
    icon: Home,
    title: 'Residential Development',
    description: 'Single-family estates to multi-unit communities, delivering homes that exceed energy and quality standards.',
  },
  {
    icon: RefreshCw,
    title: 'Renovations & Remodeling',
    description: 'Structural transformations that preserve architectural integrity while modernizing functionality and aesthetics.',
  },
  {
    icon: Route,
    title: 'Infrastructure Projects',
    description: 'Bridges, roadways, utilities, and public works engineered for 50+ year lifespans and maximum public safety.',
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    description: 'End-to-end oversight including scheduling, budgeting, subcontractor coordination, and regulatory compliance.',
  },
];

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-brand-surface overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={`inline-block text-xs font-semibold tracking-[4px] text-brand-steel/60 uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            OUR SERVICES
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Comprehensive Construction Solutions
          </h2>
          <p
            className={`text-lg text-brand-steel/80 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            From initial concept to final delivery, we provide end-to-end construction services 
            tailored to meet your unique project requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 100}ms`,
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon Container */}
              <div 
                className={`w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredIndex === index ? 'rotate-[15deg] scale-110' : ''
                }`}
              >
                <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-brand-blue mb-3">
                {service.title}
              </h3>
              <p className="text-brand-steel/70 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <button className="inline-flex items-center gap-2 text-brand-orange font-medium text-sm group/link">
                <span>Learn More</span>
                <ArrowRight 
                  className="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
                  strokeWidth={2}
                />
              </button>

              {/* Hover Border Effect */}
              <div 
                className={`absolute inset-0 rounded-2xl border-2 border-brand-orange transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <p className="text-brand-steel/60 mb-4">
            Need a custom solution for your project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-navy transition-colors duration-300"
          >
            Discuss Your Project
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;