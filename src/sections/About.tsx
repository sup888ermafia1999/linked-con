import React, { useEffect, useRef, useState } from 'react';
import { Building2, Home, RefreshCw, Route, Shield, Award, CheckCircle } from 'lucide-react';

const capabilities = [
  {
    icon: Building2,
    title: 'Commercial Construction',
    description: 'Office complexes, retail centers, and industrial facilities',
  },
  {
    icon: Home,
    title: 'Residential Development',
    description: 'Single-family estates to multi-unit communities',
  },
  {
    icon: RefreshCw,
    title: 'Renovations & Restoration',
    description: 'Historic preservation with modern functionality',
  },
  {
    icon: Route,
    title: 'Infrastructure Engineering',
    description: 'Bridges, roadways, and public works',
  },
];

const certifications = [
  { icon: Shield, label: 'OSHA VPP Star' },
  { icon: Award, label: 'LEED Accredited' },
  { icon: CheckCircle, label: 'ISO 9001 Certified' },
];

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column - 55% */}
          <div className="lg:col-span-7">
            {/* Section Label */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <span className="inline-block text-xs font-semibold tracking-[4px] text-brand-steel/60 uppercase mb-4">
                WHO WE ARE
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              About Linked Past Due Construction
            </h2>

            {/* Lead Paragraph */}
            <p
              className={`text-lg sm:text-xl text-brand-steel font-medium leading-relaxed mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              For nearly two decades, we have been at the forefront of construction excellence, 
              delivering projects that stand as testaments to our commitment to quality, safety, 
              and innovation. Our integrated approach ensures seamless execution from concept to completion.
            </p>

            {/* Description */}
            <p
              className={`text-brand-steel/80 leading-relaxed mb-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              From groundbreaking commercial developments to intricate infrastructure projects, 
              our team of over 1,200 skilled professionals brings unparalleled expertise to every job site. 
              We combine time-tested construction methods with cutting-edge technology to deliver 
              results that exceed expectations.
            </p>

            {/* Capability Grid */}
            <div
              className={`grid sm:grid-cols-2 gap-6 mb-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {capabilities.map((cap, index) => (
                <div
                  key={cap.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-brand-surface transition-colors duration-300 group"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                    <cap.icon className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-blue mb-1">{cap.title}</h3>
                    <p className="text-sm text-brand-steel/70">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div
              className={`flex flex-wrap items-center gap-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-center gap-2 text-brand-steel/70">
                  <cert.icon className="w-5 h-5 text-brand-orange" />
                  <span className="text-sm font-medium">{cert.label}</span>
                </div>
              ))}
            </div>

            {/* License Info */}
            <div
              className={`mt-6 pt-6 border-t border-gray-100 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <p className="text-sm text-brand-steel/60">
                Licensed in 18 States | IL License #CRC201234 | NASCLA Certified
              </p>
            </div>
          </div>

          {/* Image Column - 45% */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Primary Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-team.jpg"
                  alt="Construction team reviewing blueprints"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />
              </div>

              {/* Secondary Image - Overlapping */}
              <div
                className={`absolute -bottom-8 -right-8 w-2/3 z-20 rounded-xl overflow-hidden shadow-xl border-4 border-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-8 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <img
                  src="/about-detail.jpg"
                  alt="Construction detail"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Orange Accent Line */}
              <div
                className={`absolute top-1/2 -right-4 w-1 h-32 bg-brand-orange rounded-full transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{ 
                  transitionDelay: '800ms',
                  transformOrigin: 'center'
                }}
              />

              {/* Experience Badge */}
              <div
                className={`absolute -top-4 -left-4 z-30 bg-brand-blue text-white p-4 rounded-xl shadow-lg transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <div className="text-3xl font-bold">18+</div>
                <div className="text-xs text-white/80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;