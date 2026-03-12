import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const navItems = [
  { label: 'Home', section: 'hero' },
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Projects', section: 'projects' },
  { label: 'Testimonials', section: 'testimonials' },
  { label: 'Contact', section: 'contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navItems.map(item => item.section);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('hero')}
              className="flex-shrink-0 transition-transform hover:scale-105"
            >
              <Logo 
                className="h-12 w-auto" 
                variant="horizontal" 
                color={isScrolled ? 'default' : 'white'}
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    activeSection === item.section
                      ? isScrolled
                        ? 'text-brand-orange bg-brand-orange/10'
                        : 'text-brand-orange bg-white/10'
                      : isScrolled
                      ? 'text-brand-steel hover:text-brand-blue hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'bg-brand-orange text-white hover:bg-brand-orange/90 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-white text-brand-blue hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-brand-steel hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-brand-navy/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-brand-navy shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            {/* Mobile Nav Items */}
            <div className="flex-1 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full text-left px-4 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
                    activeSection === item.section
                      ? 'text-brand-orange bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange/90 transition-colors"
            >
              Get a Quote
            </button>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/60 text-sm">Call us</p>
              <a href="tel:+13125550147" className="text-white font-medium hover:text-brand-orange transition-colors">
                (312) 555-0147
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;