import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

type Category = 'All' | 'Commercial' | 'Residential' | 'Industrial' | 'Infrastructure' | 'Renovation';

interface Project {
  id: number;
  title: string;
  category: Category;
  year: number;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Metropolitan Office Tower',
    category: 'Commercial',
    year: 2024,
    image: '/project-1.jpg',
    description: '45-story Class A office building in downtown district',
  },
  {
    id: 2,
    title: 'Riverside Residential Complex',
    category: 'Residential',
    year: 2023,
    image: '/project-2.jpg',
    description: 'Luxury waterfront apartments with 240 units',
  },
  {
    id: 3,
    title: 'Harbor Bridge Expansion',
    category: 'Infrastructure',
    year: 2023,
    image: '/project-3.jpg',
    description: 'Major cable-stayed bridge reconstruction project',
  },
  {
    id: 4,
    title: 'Industrial Logistics Hub',
    category: 'Industrial',
    year: 2022,
    image: '/project-4.jpg',
    description: '1.2M sq ft distribution center with smart automation',
  },
  {
    id: 5,
    title: 'Historic District Renovation',
    category: 'Renovation',
    year: 2022,
    image: '/project-5.jpg',
    description: 'Preservation of 1920s architecture with modern systems',
  },
  {
    id: 6,
    title: 'Solar Array Installation',
    category: 'Infrastructure',
    year: 2024,
    image: '/project-6.jpg',
    description: '5MW renewable energy facility on commercial roof',
  },
];

const categories: Category[] = ['All', 'Commercial', 'Residential', 'Industrial', 'Infrastructure', 'Renovation'];

export const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span
              className={`inline-block text-xs font-semibold tracking-[4px] text-brand-steel/60 uppercase mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              OUR PORTFOLIO
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Featured Projects
            </h2>
            <p
              className={`text-lg text-brand-steel/80 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Explore our diverse portfolio of completed projects spanning commercial, 
              residential, industrial, and infrastructure sectors.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-surface text-brand-steel hover:bg-brand-blue/10 hover:text-brand-blue'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Masonry Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'h-full min-h-[400px] lg:min-h-[500px]' : 'h-64 lg:h-72'}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredProject === project.id ? 'scale-105' : 'scale-100'
                  }`}
                />
                
                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent transition-opacity duration-500 ${
                    hoveredProject === project.id ? 'opacity-90' : 'opacity-0'
                  }`}
                />

                {/* Content Overlay */}
                <div 
                  className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
                    hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {/* Category Tag */}
                  <span className="inline-block self-start px-3 py-1 bg-brand-orange text-white text-xs font-semibold rounded-full mb-3">
                    {project.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  
                  {/* Meta */}
                  <p className="text-white/70 text-sm mb-3">
                    {project.category} • {project.year}
                  </p>
                  
                  {/* Description */}
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-brand-orange font-medium text-sm group/btn">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Default Info (visible when not hovered) */}
              <div 
                className={`absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-brand-blue text-sm">{project.title}</h3>
                    <p className="text-brand-steel/60 text-xs">{project.category} • {project.year}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-steel/40" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue hover:text-white transition-all duration-300">
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;