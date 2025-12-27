'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Github, Linkedin, Instagram, Mail, Sun, Moon, Sparkles } from 'lucide-react';
import type { ProjectType } from './lib/types';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const projects: ProjectType[] = [
  {
    title: "Let 'Em Cook!",
    description: "Social cooking app that turns meal prep into a friendly competition",
    technologies: ["React Native", "TypeScript", "Supabase"],
    timeline: "Sept. 2025 – Dec. 2025",
    points: [
      "Developed social cooking app allowing users to create and submit to cooking challenges and vote on favorite community submissions",
      "Applied iterative design process from Stanford's CS 147 to conduct needfinding interviews, build experience prototypes, and create early Figma mockups",
      "Built React Native mobile app integrated with Supabase to manage user data in real time",
      "Earned 'Best Demo Award' at Stanford's CS 147 2025 Expo for excellence in design"
    ],
    link: "https://hci.stanford.edu/courses/cs147/2025/au/projects/AdultingMadeEasier/LetEmCook/"
  },
  {
    title: "ScentSync",
    description: "Recommendation engine to match EWG health and beauty products for personalized, eco-friendly routines",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS", "OpenAI API"],
    timeline: "Jan. 2025 – Mar. 2025",
    points: [
      "Developed recommendation engine to match EWG health and beauty products to suggest personalized, eco-friendly routines in line with user preferences",
      "Engineered web scraping module to collect and store data of 1,000+ products from EWG database"
    ],
    link: "https://stanfordscentsync.vercel.app/"
  },
  {
    title: "PropaGONE",
    description: "Chrome extension integrating Claude to detect and explain propaganda and manipulative language",
    technologies: ["Python", "React", "JavaScript", "Claude API"],
    timeline: "Apr. 2024 – June 2024",
    points: [
      "Developed Chrome extension integrating Claude to detect and explain propaganda and manipulative language across online news articles in under 3 seconds",
      "Implemented user feedback integration via thumbs up/down signaling to fine-tune model responses and improve detection accuracy over time"
    ],
    link: "https://drive.google.com/file/d/1dMb5b81XKFC9oI6_AM7halHBLDNUwOXV/view?usp=sharing"
  }
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/EsawAdhana', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/EsawAdhana', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/esaw.adhana', icon: Instagram },
  { name: 'Email', url: 'mailto:adhanaesaw@gmail.com', icon: Mail },
];

const languages = ["Java", "Python", "Go", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"];
const software = ["GitHub", "Git", "Next.js", "MongoDB", "Firebase", "Supabase", "React Native", "Excel"];
const interests = ["Spanish (B2)", "Investing", "Poker", "Weightlifting", "Bouldering", "Surfing", "Improv"];

const typingTexts = [
  "drinking an iced mocha",
  "projecting a V5 boulder",
  "hitting push day at the gym",
  "playing a home game of poker"
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[typingIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typingText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypingText(currentText.slice(0, typingText.length + 1));
      }, 100);
    } else if (!isDeleting && typingText.length === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typingText.length > 0) {
      timeout = setTimeout(() => {
        setTypingText(currentText.slice(0, typingText.length - 1));
      }, 50);
    } else if (isDeleting && typingText.length === 0) {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingText, typingIndex, isDeleting]);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 56; // h-14 = 56px
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
        setIsContactOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[color:var(--background)]">
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[color:var(--accent)] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[color:var(--border-subtle)] bg-[color:var(--background)]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-center relative">
          <button 
            onClick={() => scrollToSection('hero')}
            className="absolute left-6 font-mono text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors cursor-pointer"
          >
            esaw adhana
          </button>
          <nav className="flex items-center justify-center gap-8 md:gap-12">
            <button 
              onClick={() => scrollToSection('about')}
              className="font-mono text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
            >
              about
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="font-mono text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
            >
              projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="font-mono text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
            >
              contact
            </button>
          </nav>
          <button 
            onClick={toggleTheme} 
            className="absolute right-6 w-8 h-8 border border-[color:var(--border-subtle)] flex items-center justify-center hover:border-[color:var(--border)] transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="mb-48 min-h-[85vh] flex items-center scroll-mt-14 snap-start py-8">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="w-full"
          >
            <div className="grid grid-cols-12 gap-6 items-stretch">
              {/* Main content */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-mono text-sm text-[color:var(--muted)] mb-3"
                >
                  Stanford &apos;27 / Computer Science (HCI Track)
                </motion.p>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="heading-display text-5xl md:text-7xl mb-4"
                >
                  Hi, I&apos;m{' '}
                  <span className="italic">Esaw</span>
                  <span className="text-[color:var(--accent)]">.</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-[color:var(--muted)] max-w-xl leading-relaxed mb-5"
                >
                  I&apos;m a junior at Stanford University studying Computer Science.
                  <br />
                  Currently{' '}
                  <span className="text-[color:var(--foreground)] font-medium inline-flex items-center gap-1">
                    {typingText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="text-[color:var(--accent)]"
                    >
                      |
                    </motion.span>
                  </span>
                </motion.div>
              </div>

            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 md:col-span-4 flex justify-center md:justify-end h-full"
            >
              <motion.div 
                className="relative w-full aspect-[3/2] md:aspect-[5/3] border border-[color:var(--border)] overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-[color:var(--surface-alt)]">
                  <Image
                    src="/profile-picture.png"
                    alt="Esaw Adhana"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="font-mono text-xs text-white/80">2025</p>
                </motion.div>
                <div className="absolute inset-0 bg-[color:var(--accent)]/0 group-hover:bg-[color:var(--accent)]/10 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-48 py-16 scroll-mt-14 snap-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-xs text-[color:var(--muted)] mb-2">About Me</p>
                <h2 className="heading-display text-4xl md:text-5xl">About</h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
            {/* Skills */}
            <motion.div 
              className="col-span-12 md:col-span-5 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                <p className="font-mono text-xs text-[color:var(--muted)]">01 / Technical</p>
              </div>
              <h3 className="heading-display text-2xl mb-6">Skills</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs text-[color:var(--muted)] mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((skill) => (
                      <motion.span 
                        key={skill} 
                        className="tag cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.1, borderColor: 'var(--accent)' }}
                        animate={{
                          borderColor: hoveredSkill === skill ? 'var(--accent)' : 'var(--border-subtle)',
                          color: hoveredSkill === skill ? 'var(--foreground)' : 'var(--muted)'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-[color:var(--muted)] mb-2">Software & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {software.map((skill) => (
                      <motion.span 
                        key={skill} 
                        className="tag cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.1, borderColor: 'var(--accent)' }}
                        animate={{
                          borderColor: hoveredSkill === skill ? 'var(--accent)' : 'var(--border-subtle)',
                          color: hoveredSkill === skill ? 'var(--foreground)' : 'var(--muted)'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Focus */}
            <motion.div 
              className="col-span-12 md:col-span-7 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                <p className="font-mono text-xs text-[color:var(--muted)]">02 / Now</p>
              </div>
              <h3 className="heading-display text-2xl mb-6">Focus</h3>
              <p className="text-[color:var(--muted)] leading-relaxed">
                Learning more about the B2C startup world.
              </p>
              <div className="mt-6 pt-6 border-t border-[color:var(--border-subtle)]">
                <p className="font-mono text-xs text-[color:var(--muted)] mb-2">Currently working on</p>
                <p className="text-sm text-[color:var(--foreground)]">Applying to startups and preparing for interviews.</p>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div 
              className="col-span-12 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                <p className="font-mono text-xs text-[color:var(--muted)]">03 / Life</p>
              </div>
              <h3 className="heading-display text-2xl mb-6">Hobbies</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {interests.map((interest, i) => (
                  <motion.span 
                    key={interest} 
                    className="text-[color:var(--muted)] flex items-center gap-3 group/item cursor-pointer"
                    whileHover={{ x: 4, color: 'var(--foreground)' }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="font-mono text-xs text-[color:var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-48 py-16 scroll-mt-14 snap-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-xs text-[color:var(--muted)] mb-2">Selected Work</p>
                <h2 className="heading-display text-4xl md:text-5xl">Projects</h2>
              </div>
            </div>

            <div className="space-y-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <motion.button
                    onClick={() => setActiveProject(activeProject === index ? null : index)}
                    className="w-full text-left border border-[color:var(--border-subtle)] hover:border-[color:var(--border)] p-6 transition-all relative overflow-hidden"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2 flex-wrap">
                          <span className="font-mono text-xs text-[color:var(--accent)]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="heading-display text-xl md:text-2xl group-hover:text-[color:var(--accent)] transition-colors">
                            {project.title}
                          </h3>
                          {index === 0 && (
                            <motion.span 
                              className="font-mono text-xs text-[color:var(--accent)] border border-[color:var(--accent)] px-2 py-0.5"
                              whileHover={{ scale: 1.05 }}
                            >
                              featured
                            </motion.span>
                          )}
                        </div>
                        <p className="text-[color:var(--muted)] text-sm md:text-base">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[color:var(--muted)] hidden md:block">
                          {project.timeline}
                        </span>
                        <motion.span 
                          animate={{ rotate: activeProject === index ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </motion.span>
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {activeProject === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-x border-b border-[color:var(--border)] bg-[color:var(--surface)]"
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-8">
                              <p className="font-mono text-xs text-[color:var(--muted)] mb-4">Details</p>
                              <ul className="space-y-3">
                                {project.points.map((point, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="flex items-start gap-3 text-[color:var(--muted)]"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <span className="text-[color:var(--accent)] mt-1">—</span>
                                    <span>{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                              <p className="font-mono text-xs text-[color:var(--muted)] mb-4">Tech Stack</p>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech, i) => (
                                  <motion.span 
                                    key={tech} 
                                    className="tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.1, borderColor: 'var(--accent)' }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                              {project.link && (
                                <motion.a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-primary inline-flex group"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  View Project
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-40 py-16 scroll-mt-14 snap-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-xs text-[color:var(--muted)] mb-2">Get in Touch</p>
                <h2 className="heading-display text-4xl md:text-5xl">Contact</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              {/* Contact Info */}
              <motion.div 
                className="col-span-12 md:col-span-8 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                  <p className="font-mono text-xs text-[color:var(--muted)]">01 / Message</p>
                </div>
                <h3 className="heading-display text-2xl mb-6">Get in Touch</h3>
                <p className="text-[color:var(--muted)] leading-relaxed mb-6">
                  I&apos;m always interested in hearing about new opportunities, interesting projects, or just connecting to meet someone new!
                </p>
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  className="btn-primary group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send a Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="col-span-12 md:col-span-4 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                  <p className="font-mono text-xs text-[color:var(--muted)]">02 / Social</p>
                </div>
                <h3 className="heading-display text-2xl mb-6">Links</h3>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target={link.url.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-3 text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors group/item"
                      aria-label={link.name}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="text-sm font-mono">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="pt-8 pb-8 border-t border-[color:var(--border-subtle)]">
          <p className="font-mono text-xs text-[color:var(--muted)] text-center">
            © 2025 Esaw Adhana
          </p>
        </footer>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsContactOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[color:var(--background)] border-l border-[color:var(--border)] z-50 overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-12">
                  <p className="font-mono text-xs text-[color:var(--muted)]">Contact</p>
                  <button
                    onClick={() => setIsContactOpen(false)}
                    className="w-8 h-8 border border-[color:var(--border)] flex items-center justify-center hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="heading-display text-3xl mb-2">
                  Send a Message
                </h2>
                <p className="text-[color:var(--muted)] mb-8">
                  I&apos;ll get back to you as soon as I can.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                    <label className="font-mono text-xs text-[color:var(--muted)] mb-2 block">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                />
                    {errors.name && <span className="text-[color:var(--accent)] text-sm mt-1 block">Required</span>}
              </div>
              
              <div>
                    <label className="font-mono text-xs text-[color:var(--muted)] mb-2 block">
                  Email
                </label>
                <input
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className="form-input"
                      placeholder="you@example.com"
                />
                    {errors.email && <span className="text-[color:var(--accent)] text-sm mt-1 block">Valid email required</span>}
              </div>

              <div>
                    <label className="font-mono text-xs text-[color:var(--muted)] mb-2 block">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                      rows={5}
                  className="form-input resize-none"
                  placeholder="Your message..."
                />
                    {errors.message && <span className="text-[color:var(--accent)] text-sm mt-1 block">Required</span>}
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                    className="btn-primary w-full justify-center"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="w-4 h-4" />
              </button>

              {isSubmitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center font-mono text-sm text-green-600 dark:text-green-400"
                    >
                  Message sent successfully!
                    </motion.p>
                  )}
                </form>

                <div className="mt-12 pt-8 border-t border-[color:var(--border-subtle)]">
                  <p className="font-mono text-xs text-[color:var(--muted)] mb-4">Or reach out directly</p>
                  <a
                    href="mailto:adhanaesaw@gmail.com"
                    className="text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
                  >
                    adhanaesaw@gmail.com
                  </a>
                </div>
              </div>
          </motion.div>
          </>
      )}
      </AnimatePresence>
    </main>
  );
}
