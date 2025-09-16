'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import AnimatedElement from './components/AnimatedElement';
import { useTheme } from './context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Sun, Moon, ExternalLink, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { ProjectType } from './lib/types';

type FormData = {
  name: string;
  email: string;
  message: string;
};

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
      "Co-authored research paper and delivered presentation for Stanford's CS 197 class"
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
      "Launched on Mango Pi platform with 14 self-written modules"
    ],
  },
  {
    title: "Poker Simulator",
    description: "Program capable of running simulated games of No-Limits Texas Hold'Em",
    technologies: ["Java"],
    timeline: "June 2023 – Aug. 2023",
    points: [
      "Developed program capable of running simulated games of No-Limits Texas Hold'Em",
      "Calculates hand equity through Monte Carlo simulations, iterating through possible hands"
    ],
  }
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentProjectIndex];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await emailjs.send(
        'service_k6jevbu',
        'template_j214qi4',
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        'mDlMd4fMOp_qwT6cA'
      );

      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        setIsContactModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen theme-bg font-geist relative overflow-hidden">
      {/* Fixed Position Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button 
          onClick={() => setIsContactModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[color:var(--accent)] hover:bg-[color:var(--accent-light)] transition-all shadow-lg text-white font-medium"
          aria-label="Contact me"
        >
          <Mail className="w-5 h-5" />
          <span className="text-sm">Message Me</span>
        </button>
        
        <button 
          onClick={toggleTheme} 
          className="p-3 rounded-full bg-[color:var(--card-accent)] hover:bg-[color:var(--accent-light)]/30 transition-colors shadow-lg"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 
            <Sun className="w-5 h-5 text-[color:var(--accent)]" /> : 
            <Moon className="w-5 h-5 text-[color:var(--accent)]" />
          }
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-radial from-[color:var(--accent-light)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-64 h-64 bg-gradient-radial from-[color:var(--accent)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-radial from-[color:var(--accent-light)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto p-8 space-y-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 pt-8">
          <AnimatedElement>
            <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-2 border-[color:var(--card-accent)] shadow-soft">
              <div className="absolute inset-0 border-[3px] border-[color:var(--accent)]/20 rounded-full"></div>
              <Image
                src="/profile-picture.png"
                alt="Esaw Adhana"
                fill
                className="object-cover scale-[1.2] object-[center_top]"
                priority
              />
            </div>
          </AnimatedElement>

          <div className="text-center md:text-left flex-grow">
            <AnimatedElement delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 theme-text">
                Hi, I&apos;m <span className="theme-accent relative">
                  Esaw Adhana.
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-[color:var(--accent)]/30"></span>
                </span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={0.3}>
              <p className="text-xl theme-text-secondary mb-4">
                Junior at Stanford University studying Computer Science.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0.4}>
              <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto md:mx-0 mb-6">
                <div className="h-px flex-grow bg-[color:var(--card-accent)]"></div>
                <span className="text-sm text-[color:var(--foreground)] opacity-60">Stanford &apos;27</span>
                <div className="h-px flex-grow bg-[color:var(--card-accent)]"></div>
              </div>
            </AnimatedElement>

            {/* Quick Contact Links */}
            <AnimatedElement delay={0.5}>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a 
                  href="mailto:adhanaesaw@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 theme-card rounded-lg hover:bg-[color:var(--accent)]/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[color:var(--accent)]" />
                  <span className="text-sm font-medium theme-text">Email</span>
                </a>
                
                <a 
                  href="https://github.com/EsawAdhana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 theme-card rounded-lg hover:bg-[color:var(--accent)]/10 transition-colors"
                >
                  <Github className="w-4 h-4 text-[color:var(--accent)]" />
                  <span className="text-sm font-medium theme-text">GitHub</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/EsawAdhana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 theme-card rounded-lg hover:bg-[color:var(--accent)]/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[color:var(--accent)]" />
                  <span className="text-sm font-medium theme-text">LinkedIn</span>
                </a>

                <a 
                  href="https://instagram.com/esaw.adhana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 theme-card rounded-lg hover:bg-[color:var(--accent)]/10 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[color:var(--accent)]" />
                  <span className="text-sm font-medium theme-text">Instagram</span>
                </a>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedElement delay={0.6}>
            <div className="p-6 theme-card h-full flex flex-col">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-light)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold theme-text">Technical Skills</h2>
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  {["Java", "Python", "Go", "C++", "React", "Next.js"].map((skill) => (
                    <div
                      key={skill}
                      className="skill-tag text-center hover:scale-105 transition-transform"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.7}>
            <div className="p-6 theme-card">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-light)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold theme-text">Current Focus</h2>
                </div>
              </div>
              <div className="text-center">
                <p className="theme-text-secondary text-center leading-relaxed">
                  Learning more about and entering the startup world.
                </p>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.8}>
            <div className="p-6 theme-card h-full flex flex-col">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-light)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold theme-text">Interests</h2>
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-1 gap-2 max-w-xs">
                    {["Weightlifting", "Bouldering", "Surfing", "Poker", "Stocks/Trading"].map((interest, index) => (
                      <div key={interest} className="flex items-center justify-center gap-2 text-sm theme-text-secondary">
                        <span className="w-2 h-2 rounded-full bg-[color:var(--accent)]"></span>
                        <span>{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </section>

        {/* Projects Carousel */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold theme-text">Projects</h2>
            </div>

            <div className="relative">
              {/* Carousel Container */}
              <div className="theme-card overflow-hidden">
                {currentProjectIndex === 0 && (
                  <div className="bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-light)] h-2"></div>
                )}
                
                <div className="p-8">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold theme-text">{currentProject.title}</h3>
                      {currentProjectIndex === 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[color:var(--accent)]/10 text-[color:var(--accent)] rounded-full">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm theme-text-secondary">{currentProject.timeline}</span>
                  </div>

                  {/* Project Description */}
                  <p className="theme-text-secondary mb-6 text-lg">{currentProject.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="skill-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Points */}
                  <div className="space-y-3 mb-6">
                    {currentProject.points.map((point, pointIndex) => (
                      <p key={pointIndex} className="theme-text-secondary flex items-start">
                        <span className="text-[color:var(--accent)] mr-2 font-bold">•</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>

                  {/* Project Link */}
                  {currentProject.link && (
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[image:var(--button-bg)] hover:bg-[image:var(--button-hover)] text-white rounded-md transition-colors font-medium"
                    >
                      View Project
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevProject}
                className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[color:var(--card-accent)] hover:bg-[color:var(--accent)]/20 transition-colors flex items-center justify-center group shadow-md"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 text-[color:var(--accent)] group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextProject}
                className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[color:var(--card-accent)] hover:bg-[color:var(--accent)]/20 transition-colors flex items-center justify-center group shadow-md"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 text-[color:var(--accent)] group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProjectIndex
                      ? 'bg-[color:var(--accent)] scale-110'
                      : 'bg-[color:var(--card-accent)] hover:bg-[color:var(--accent)]/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </section>

      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          ></div>
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md theme-card p-6 z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold theme-text">Send Me a Message</h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 rounded-full hover:bg-[color:var(--card-accent)] transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium theme-text mb-2">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                />
                {errors.name && <span className="text-red-500 text-sm mt-1 block">Name is required</span>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium theme-text mb-2">
                  Email
                </label>
                <input
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="text-red-500 text-sm mt-1 block">Valid email is required</span>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium theme-text mb-2">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Your message..."
                />
                {errors.message && <span className="text-red-500 text-sm mt-1 block">Message is required</span>}
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="btn-primary w-full"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {isSubmitted && (
                <div className="text-green-500 dark:text-green-400 text-center font-medium p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  Message sent successfully!
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}