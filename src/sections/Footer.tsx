import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  Twitter,
  ArrowUp,
  Shield,
  Award,
  CheckCircle
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const quickLinks = [
  { label: 'Home', section: 'hero' },
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Projects', section: 'projects' },
  { label: 'Careers', section: 'careers' },
  { label: 'News', section: 'news' },
];

const services = [
  'General Construction',
  'Commercial Building',
  'Residential Development',
  'Renovations & Remodeling',
  'Infrastructure Projects',
  'Project Management',
];

const legal = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Accessibility', href: '#' },
  { label: 'Sitemap', href: '#' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const certifications = [
  { icon: Shield, label: 'Equal Opportunity Employer' },
  { icon: Award, label: 'OSHA VPP Star' },
  { icon: CheckCircle, label: 'LEED Accredited' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (section: string) => {
    if (section === 'careers' || section === 'news') {
      // These would be separate pages in a full implementation
      alert('Coming soon!');
      return;
    }
    onNavigate(section);
  };

  return (
    <footer className="relative bg-brand-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo className="h-16 w-auto" variant="horizontal" color="white" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Building excellence since 2006. We deliver premium construction solutions 
              with unwavering commitment to quality, safety, and client satisfaction.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.section)}
                    className="text-white/70 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-white/70 hover:text-brand-orange transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-brand-orange transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm text-center lg:text-left">
              © 2026 Linked Past Due Construction. All rights reserved.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-center gap-2 text-white/50">
                  <cert.icon className="w-4 h-4" />
                  <span className="text-xs">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;