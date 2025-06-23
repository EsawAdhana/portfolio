'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import type { ProjectType } from '@/app/lib/types';
import ProjectCard from '@/app/components/ProjectCard';
import { FolderKanban, Code, Zap, ExternalLink } from 'lucide-react';

const projects: ProjectType[] = [
  {
    title: "ScentSync",
    description: "Personalized fragrance website that suggests compatible personal care products",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS", "OpenAI API"],
    timeline: "Jan. 2025 – Mar. 2025",
    points: [
      "Engineered web scraping module to collect and store data of 1,000+ products from EWG database",
      "Implemented user authentication via Next-Auth and designed data persistence by storing in MongoDB",
      "Created intuitive user flows for product recommendations and personalized routines"
    ],
    link: "https://stanfordscentsync.vercel.app/"
  },
  {
    title: "PropaGONE",
    description: "Extension to identify and highlight propaganda and misinformation in news articles",
    technologies: ["Python", "React", "JavaScript", "Claude API"],
    timeline: "Apr. 2024 – June 2024",
    points: [
      "Deployed extension to identify and highlight propaganda and misinformation in news articles",
      "Administered speedy feedback and analysis to users through highlighting and text tooltips in seconds",
      "Co-authored research paper and delivered presentation for Stanford's CS 197 class",
      "Integrated Claude-3 Opus API for advanced text analysis and bias detection"
    ],
    link: "https://drive.google.com/file/d/1dMb5b81XKFC9oI6_AM7halHBLDNUwOXV/view?usp=sharing"
  },
  {
    title: "Bare-metal Console",
    description: "Command-executing console written entirely from scratch",
    technologies: ["C", "Assembly"],
    timeline: "Jan. 2024 – Mar. 2024",
    points: [
      "Programmed command-executing console written entirely from scratch",
      "Designed custom I/O handling, capable of displaying results to screen",
      "Launched on Mango Pi platform with 14 self-written modules",
      "Implemented memory management and process scheduling from first principles",
      "Created custom drivers for keyboard input and display output"
    ],
  },
  {
    title: "Poker Simulator",
    description: "Program capable of running simulated games of No-Limits Texas Hold'Em",
    technologies: ["Java"],
    timeline: "June 2023 – Aug. 2023",
    points: [
      "Developed program capable of running simulated games of No-Limits Texas Hold'Em",
      "Calculates hand equity through Monte Carlo simulations, iterating through possible hands",
      "Implemented advanced probability calculations for pre-flop and post-flop scenarios",
    ],
  }
];

export default function Projects() {
  useTheme();

  return (
    <main className="min-h-screen pt-24 px-4 theme-bg pb-16 font-geist relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-gradient-radial from-[color:var(--accent-light)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-gradient-radial from-[color:var(--accent)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-light)]">Projects</h1>
        </motion.div>

        {/* Project Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="theme-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center mb-4">
              <FolderKanban className="text-[color:var(--accent)]" size={24} />
            </div>
            <h3 className="text-lg font-semibold theme-text mb-2">Full-Stack Applications</h3>
            <p className="theme-text-secondary">Web applications with frontend and backend components</p>
          </div>

          <div className="theme-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center mb-4">
              <Code className="text-[color:var(--accent)]" size={24} />
            </div>
            <h3 className="text-lg font-semibold theme-text mb-2">Collaborative Development</h3>
            <p className="theme-text-secondary">Team-based projects using Git/GitHub and other version control systems</p>
          </div>

          <div className="theme-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center mb-4">
              <Zap className="text-[color:var(--accent)]" size={24} />
            </div>
            <h3 className="text-lg font-semibold theme-text mb-2">Algorithms & Simulations</h3>
            <p className="theme-text-secondary">Complex algorithms and computational simulations</p>
          </div>
        </motion.div>

        {/* Featured Project with special styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 theme-text text-center">Featured Project</h2>
          <div className="theme-card overflow-hidden">
            <div className="bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-light)] h-2"></div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold theme-text">{projects[0].title}</h2>
                <span className="text-sm theme-text-secondary">{projects[0].timeline}</span>
              </div>

              <p className="theme-text-secondary mt-3 mb-5 text-lg">{projects[0].description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {projects[0].technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="skill-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                {projects[0].points.map((point, pointIndex) => (
                  <p key={pointIndex} className="theme-text-secondary flex items-start">
                    <span className="text-[color:var(--accent)] mr-2 font-bold">•</span>
                    <span>{point}</span>
                  </p>
                ))}

                {projects[0].link && (
                  <a
                    href={projects[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[image:var(--button-bg)] hover:bg-[image:var(--button-hover)] text-white rounded-md transition-colors font-medium"
                  >
                    View Project
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold mb-6 theme-text">More Projects</h2>
        <div className="space-y-8">
          {projects.slice(1).map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}