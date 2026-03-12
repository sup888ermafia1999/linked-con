import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { value: 2400, suffix: '+', label: 'Projects' },
  { value: 4.2, suffix: 'B', prefix: '$', label: 'Revenue' },
  { value: 18, suffix: '', label: 'States' },
  { value: 98, suffix: '%', label: 'Safety Rating' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current?.offsetHeight || 0;
        if (scrollY < heroHeight) {
          bgRef.current.style.transform = `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen max-h-[900px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Construction crane against blue sky"
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(11, 61, 145, 0.85) 0%, rgba(6, 26, 58, 0.7) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium tracking-wide">
            EST. 2006 | LICENSED & INSURED
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
          {['Building', 'the', 'Future', 'with', 'Precision', 'and', 'Integrity'].map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-3 sm:mr-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className={`max-w-3xl mx-auto text-lg sm:text-xl text-white/80 mb-10 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          Trusted construction solutions for residential, commercial, and infrastructure projects. 
          Delivering excellence across 18 states with 2,400+ completed projects.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1100ms' }}
        >
          <button
            onClick={() => onNavigate('contact')}
            className="group relative px-8 py-4 bg-brand-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-pulse-slow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="group px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            View Projects
          </button>
        </div>

        {/* Stats Bar */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1300ms' }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              style={{ animationDelay: `${1400 + index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                  duration={2000 + index * 200}
                />
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1600ms' }}
      >
        <button
          onClick={() => onNavigate('about')}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs font-medium mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;