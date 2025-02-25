'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectType } from '@/app/lib/types';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.25, 0.95]
      }}
      className="theme-card overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold theme-text">{project.title}</h2>
          <span className="text-sm theme-text-secondary">{project.timeline}</span>
        </div>
        
        <p className="theme-text-secondary mt-3 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div 
          className={`space-y-2 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96' : 'max-h-24'
          }`}
        >
          {project.points.map((point, pointIndex) => (
            <p key={pointIndex} className="theme-text-secondary flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 font-medium">•</span>
              <span>{point}</span>
            </p>
          ))}
          
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-4 font-medium"
            >
              <span>View Project</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      
      <button
        onClick={toggleExpanded}
        className="w-full p-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
      >
        {isExpanded ? (
          <>
            <span className="mr-1">Show Less</span>
            <ChevronUp size={16} />
          </>
        ) : (
          <>
            <span className="mr-1">Show More</span>
            <ChevronDown size={16} />
          </>
        )}
      </button>
    </motion.div>
  );
}