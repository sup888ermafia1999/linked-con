import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  Loader2,
  AlertCircle
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

const projectTypes = [
  'General Construction',
  'Commercial Building',
  'Residential Development',
  'Renovations & Remodeling',
  'Infrastructure Projects',
  'Project Management',
  'Other',
];

const contactInfo = [
  {
    icon: MapPin,
    title: 'Headquarters',
    lines: ['1847 Industrial Parkway', 'Suite 400', 'Chicago, IL 60608'],
  },
  {
    icon: Phone,
    title: 'Main Line',
    lines: ['(312) 555-0147'],
  },
  {
    icon: Mail,
    title: 'New Business',
    lines: ['projects@linkedpastdue.com'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon-Fri: 7:00 AM - 6:00 PM', 'Sat: By appointment'],
  },
];

export const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\(\d{3}\)\s?\d{3}-\d{4}$/.test(value.replace(/\s/g, ''))) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'projectType':
        if (!value) return 'Please select a project type';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 20) return 'Message must be at least 20 characters';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
    if (touched.phone) {
      const error = validateField('phone', value);
      setErrors(prev => ({ ...prev, phone: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });
    
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phone: true, projectType: true, message: true });
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', email: '', phone: '', projectType: '', message: '' });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={`inline-block text-xs font-semibold tracking-[4px] text-brand-steel/60 uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            GET IN TOUCH
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Start Your Project
          </h2>
          <p
            className={`text-lg text-brand-steel/80 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Ready to bring your vision to life? Contact us today for a free consultation 
            and project estimate.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form Column - 60% */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {isSuccess ? (
              <div className="bg-brand-surface rounded-2xl p-8 lg:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-brand-steel/70 mb-6">
                  Thank you for reaching out. Our team will review your inquiry and get back to you 
                  within 24-48 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-navy transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label 
                      htmlFor="fullName" 
                      className={`absolute left-0 transition-all duration-200 ${
                        formData.fullName || touched.fullName
                          ? '-top-6 text-xs text-brand-orange'
                          : 'top-3 text-brand-steel/60'
                      }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-0 py-3 bg-transparent border-b-2 focus:outline-none transition-colors ${
                        errors.fullName && touched.fullName
                          ? 'border-red-500'
                          : 'border-gray-200 focus:border-brand-orange'
                      }`}
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label 
                      htmlFor="email" 
                      className={`absolute left-0 transition-all duration-200 ${
                        formData.email || touched.email
                          ? '-top-6 text-xs text-brand-orange'
                          : 'top-3 text-brand-steel/60'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-0 py-3 bg-transparent border-b-2 focus:outline-none transition-colors ${
                        errors.email && touched.email
                          ? 'border-red-500'
                          : 'border-gray-200 focus:border-brand-orange'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="relative">
                    <label 
                      htmlFor="phone" 
                      className={`absolute left-0 transition-all duration-200 ${
                        formData.phone || touched.phone
                          ? '-top-6 text-xs text-brand-orange'
                          : 'top-3 text-brand-steel/60'
                      }`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={handleBlur}
                      placeholder="(___) ___-____"
                      className={`w-full px-0 py-3 bg-transparent border-b-2 focus:outline-none transition-colors ${
                        errors.phone && touched.phone
                          ? 'border-red-500'
                          : 'border-gray-200 focus:border-brand-orange'
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Project Type */}
                  <div className="relative">
                    <label 
                      htmlFor="projectType" 
                      className={`absolute left-0 transition-all duration-200 ${
                        formData.projectType || touched.projectType
                          ? '-top-6 text-xs text-brand-orange'
                          : 'top-3 text-brand-steel/60'
                      }`}
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-0 py-3 bg-transparent border-b-2 focus:outline-none transition-colors appearance-none cursor-pointer ${
                        errors.projectType && touched.projectType
                          ? 'border-red-500'
                          : 'border-gray-200 focus:border-brand-orange'
                      }`}
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && touched.projectType && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.projectType}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 transition-all duration-200 ${
                      formData.message || touched.message
                        ? '-top-6 text-xs text-brand-orange'
                        : 'top-3 text-brand-steel/60'
                    }`}
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full px-0 py-3 bg-transparent border-b-2 focus:outline-none transition-colors resize-none ${
                      errors.message && touched.message
                        ? 'border-red-500'
                        : 'border-gray-200 focus:border-brand-orange'
                    }`}
                  />
                  {errors.message && touched.message && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Column - 40% */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="bg-brand-surface rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-blue mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-blue text-sm mb-1">
                        {info.title}
                      </h4>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-brand-steel/70 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden bg-gray-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-brand-blue/40 mx-auto mb-2" />
                  <p className="text-brand-steel/60 text-sm">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;