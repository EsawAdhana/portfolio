'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ExternalLink, X, Github, Linkedin, Instagram, Mail, Sparkles, FileText } from 'lucide-react';
import type { ProjectType } from './lib/types';
import { ProjectImageCarousel } from './components/ProjectImageCarousel';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const projects: ProjectType[] = [
  {
    title: "Stanford Root",
    description:
      "Course discovery mobile + web app for the Stanford student community",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    timeline: "Jan. 2026 – Present",
    points: [
      "Built course discovery/planning mobile + web app for fellow Stanford students, integrating multi-filter search, GER class tracking, and cross-device schedule synchronization",
      "Developed custom data pipeline using Puppeteer and Cheerio to ingest and structure years of unstructured course evaluation data into a high-performance Supabase schema",
      "Optimized system latency through multi-layer caching and two-phase data loading, achieving sub-200ms repeat load times for a catalog of 10,000+ courses",
    ],
    link: "https://stanfordroot.com",
    linkNote: "Note an @stanford.edu email address is required",
    gallery: [
      "/projects/stanford-root/01.png",
      "/projects/stanford-root/02.png",
      "/projects/stanford-root/03.png",
      "/projects/stanford-root/04.png",
      "/projects/stanford-root/05.png",
    ],
  },
  {
    title: "Let 'em Cook",
    description:
      "Social cooking app for young adults, focus on building community and trying new things",
    technologies: ["React Native", "TypeScript", "Supabase"],
    timeline: "Sep. 2025 – Dec. 2025",
    points: [
      "Grounded in needfinding: we found cooking felt like a chore, and there was little fun or motivation for young adults, leading us in a social game-like direction",
      "Built social mobile app allowing users to create + join cooking competitions with fellow users and then cook and digitally share their creations with each another",
      "Led our four-person team through all stages of the CS 147 design cycle, from early prototyping to final product, incorporating user feedback throughout, and winning the Best Demo Award for our final app",
    ],
    link: "/projects/let-em-cook/upscaled-video.mp4",
    linkLabel: "Demo video",
  },
  {
    title: "PropaGONE",
    description: "Chrome extension integrating Claude to detect propaganda and manipulative language",
    technologies: ["React", "Python", "JavaScript", "Claude API"],
    timeline: "Apr. 2024 – Jun. 2024",
    points: [
      "Developed Chrome extension integrating Claude that detects and explains propaganda and manipulative language in online news articles within 3 seconds",
      "Designed user feedback integration via thumbs up/down signaling to fine-tune model responses and improve detection accuracy over time",
    ],
    link: "https://drive.google.com/file/d/1dMb5b81XKFC9oI6_AM7halHBLDNUwOXV/view?usp=sharing",
    linkLabel: "Read Paper",
  },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/EsawAdhana', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/esawadhana', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/esaw.adhana', icon: Instagram },
  { name: 'Resume', url: '/resume.pdf', icon: FileText },
  { name: 'Email', url: 'mailto:adhanaesaw@gmail.com', icon: Mail },
];

const languages = ["Java", "Python", "Go", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"];
const software = ["GitHub", "Git", "Next.js", "MongoDB", "Firebase", "Supabase", "React Native", "Excel"];
const interests = ["Spanish (B2)", "Investing", "Poker", "Weightlifting", "Bouldering", "Surfing", "Espresso"];

const typingTexts = [
  "drinking an iced mocha",
  "projecting a V5 boulder",
  "hitting push day at the gym",
  "hosting a game of poker"
];

function linkDisplayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Open link';
  }
}

function projectLinkLabel(project: ProjectType): string {
  if (project.linkLabel) return project.linkLabel;
  if (!project.link) return '';
  return linkDisplayHost(project.link);
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [typingText, setTypingText] = useState('');
  /** Ref-driven state machine so one effect schedules variable delays (smoother than fixed 100/50ms ticks). */
  const typingMachineRef = useRef({
    phraseIndex: 0,
    charIndex: 0,
    deleting: false,
  });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Typing animation: variable delays feel less mechanical; single effect avoids per-char effect churn
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const jitter = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const tick = () => {
      const m = typingMachineRef.current;
      const phrase = typingTexts[m.phraseIndex];

      if (!m.deleting) {
        if (m.charIndex < phrase.length) {
          m.charIndex += 1;
          setTypingText(phrase.slice(0, m.charIndex));
          timeoutId = setTimeout(tick, jitter(42, 88));
        } else {
          timeoutId = setTimeout(() => {
            typingMachineRef.current.deleting = true;
            tick();
          }, jitter(1500, 2100));
        }
      } else if (m.charIndex > 0) {
        m.charIndex -= 1;
        setTypingText(phrase.slice(0, m.charIndex));
        timeoutId = setTimeout(tick, jitter(18, 36));
      } else {
        m.deleting = false;
        m.phraseIndex = (m.phraseIndex + 1) % typingTexts.length;
        timeoutId = setTimeout(tick, jitter(220, 420));
      }
    };

    timeoutId = setTimeout(tick, jitter(280, 520));
    return () => clearTimeout(timeoutId);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const headerHeight = 56; // h-14 = 56px

    // Contact: prefer scrolling to the true bottom so the footer is in view. If the
    // contact section starts above the viewport at max scroll (common on narrow/tall
    // viewports), bottom scroll hides the contact—align to the section instead.
    if (id === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const contactTop =
          element.getBoundingClientRect().top + window.pageYOffset;
        if (contactTop < maxScroll) {
          window.scrollTo({
            top: contactTop - headerHeight,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo({ top: maxScroll, behavior: 'smooth' });
        }
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between relative">
          <button 
            onClick={() => scrollToSection('hero')}
            className="hidden md:block text-portfolio-label hover:text-[color:var(--foreground)] transition-colors cursor-pointer"
          >
            esaw adhana
          </button>
          <nav className="flex items-center justify-center gap-3 md:gap-6 lg:gap-10 flex-1 md:flex-none flex-wrap">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-portfolio-label hover:text-[color:var(--foreground)] transition-colors"
            >
              about
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-portfolio-label hover:text-[color:var(--foreground)] transition-colors"
            >
              projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-portfolio-label hover:text-[color:var(--foreground)] transition-colors"
            >
              contact
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-3">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="mb-48 min-h-[85vh] flex items-center scroll-mt-14 py-8">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="w-full"
          >
            <div className="grid grid-cols-12 gap-6 items-stretch">
              {/* Main content */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-5 max-w-2xl space-y-1.5"
                >
                  <p className="font-mono text-base md:text-lg text-[color:var(--foreground)] leading-snug tracking-tight">
                    Stanford &apos;27 / Computer Science
                  </p>
                  <p className="font-mono text-sm md:text-base text-[color:var(--muted)] leading-snug">
                    · Ex-Google · Ex-Uber
                  </p>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="heading-display text-6xl md:text-8xl mb-5"
                >
                  Hi, I&apos;m{' '}
                  <span className="italic">Esaw</span>
                  <span className="text-[color:var(--accent)]">.</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-portfolio-body max-w-xl mb-5"
                >
                  <p>
                    Currently{' '}
                    <span className="text-portfolio-body-strong inline-flex items-center gap-1">
                      {typingText}
                      <motion.span
                        aria-hidden
                        className="inline-block w-[0.06em] min-w-[2px] h-[1em] translate-y-[0.08em] rounded-[1px] bg-[color:var(--accent)] align-middle"
                        animate={{ opacity: [1, 0.2] }}
                        transition={{
                          duration: 0.52,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    </span>
                  </p>
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
                <div className="absolute inset-0 bg-[color:var(--accent)]/0 group-hover:bg-[color:var(--accent)]/10 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-48 py-16 scroll-mt-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="heading-display text-5xl md:text-6xl">About</h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
            {/* Skills */}
            <motion.div 
              className="col-span-12 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                <p className="text-portfolio-label">01 / Technical</p>
              </div>
              <h3 className="text-portfolio-title mb-6">Skills</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-portfolio-label mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((skill) => (
                      <motion.span 
                        key={skill} 
                        className="tag-skill cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
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
                  <p className="text-portfolio-label mb-2">Software & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {software.map((skill) => (
                      <motion.span 
                        key={skill} 
                        className="tag-skill cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
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

            {/* Interests */}
            <motion.div 
              className="col-span-12 border border-[color:var(--border)] p-6 group hover:border-[color:var(--accent)] transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                <p className="text-portfolio-label">02 / Life</p>
              </div>
              <h3 className="text-portfolio-title mb-6">Hobbies</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {interests.map((interest, i) => (
                  <motion.span 
                    key={interest} 
                    className="text-portfolio-body flex items-center gap-3 group/item cursor-pointer"
                    whileHover={{ x: 4, color: 'var(--foreground)' }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="text-portfolio-label text-[color:var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-48 py-16 scroll-mt-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="heading-display text-5xl md:text-6xl">Projects</h2>
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
                          <span className="text-portfolio-label text-[color:var(--accent)]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-portfolio-title group-hover:text-[color:var(--accent)] transition-colors">
                            {project.title}
                          </h3>
                          {index === 0 && (
                            <motion.span 
                              className="text-portfolio-label text-[color:var(--accent)] border border-[color:var(--accent)] px-2 py-0.5"
                              whileHover={{ scale: 1.05 }}
                            >
                              featured
                            </motion.span>
                          )}
                        </div>
                        <p className="text-portfolio-body">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-portfolio-label hidden md:block">
                          {project.timeline}
                        </span>
                        <motion.span
                          animate={{ rotate: activeProject === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[color:var(--muted)]"
                        >
                          <ChevronDown className="w-5 h-5" aria-hidden />
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
                          {project.gallery && project.gallery.length > 0 && (
                            <div className="mb-6">
                              <ProjectImageCarousel
                                images={project.gallery}
                                label={project.title}
                              />
                            </div>
                          )}
                          <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-8">
                              <p className="text-portfolio-label mb-4">Details</p>
                              <ul className="space-y-3">
                                {project.points.map((point, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="flex items-start gap-3 text-portfolio-body"
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
                              <p className="text-portfolio-label mb-4">Tech Stack</p>
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
                                <div>
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-portfolio-body text-[color:var(--foreground)] transition-colors hover:text-[color:var(--accent)] group/live"
                                  >
                                    {projectLinkLabel(project)}
                                    <ExternalLink
                                      className="h-4 w-4 shrink-0 opacity-50 group-hover/live:opacity-90"
                                      aria-hidden
                                    />
                                  </a>
                                  {project.linkNote && (
                                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                                      {project.linkNote}
                                    </p>
                                  )}
                                </div>
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
        <section id="contact" className="mb-40 py-16 scroll-mt-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="heading-display text-5xl md:text-6xl">Contact</h2>
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
                  <p className="text-portfolio-label">01 / Message</p>
                </div>
                <p className="text-portfolio-body mb-6">
                  I&apos;m always interested in hearing about new opportunities, interesting projects, or just connecting to meet someone new!
                </p>
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  className="btn-contact group"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden />
                  Send a message
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
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
                  <p className="text-portfolio-label">02 / Social</p>
                </div>
                <h3 className="text-portfolio-title mb-6">Links</h3>
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
                      <span className="text-portfolio-label">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="pt-8 pb-3 border-t border-[color:var(--border-subtle)]">
          <p className="text-portfolio-label text-center">
            © {new Date().getFullYear()} Esaw Adhana
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
              className="fixed top-0 right-0 h-dvh max-h-dvh w-full max-w-md flex flex-col overflow-hidden bg-[color:var(--background)] border-l border-[color:var(--border)] z-50"
            >
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex shrink-0 items-center justify-between mb-5 sm:mb-6">
                  <p className="text-portfolio-label">Contact</p>
                  <button
                    onClick={() => setIsContactOpen(false)}
                    className="w-8 h-8 border border-[color:var(--border)] flex items-center justify-center hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-portfolio-title mb-1.5 shrink-0">
                  Send a Message
                </h2>
                <p className="text-portfolio-body mb-4 shrink-0 text-base leading-snug sm:mb-5 sm:leading-relaxed">
                  I&apos;ll get back to you as soon as I can.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-4"
                >
                  <div className="shrink-0">
                    <label className="text-portfolio-label mb-1 block text-sm sm:mb-2 sm:text-base">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-input py-2.5 sm:py-3.5"
                  placeholder="Your name"
                />
                    {errors.name && <span className="text-portfolio-body text-[color:var(--accent)] mt-1 block">Required</span>}
              </div>
              
                  <div className="shrink-0">
                    <label className="text-portfolio-label mb-1 block text-sm sm:mb-2 sm:text-base">
                  Email
                </label>
                <input
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className="form-input py-2.5 sm:py-3.5"
                      placeholder="you@example.com"
                />
                    {errors.email && <span className="text-portfolio-body text-[color:var(--accent)] mt-1 block">Valid email required</span>}
              </div>

                  <div className="flex min-h-0 flex-1 flex-col gap-1 sm:gap-2">
                    <label className="text-portfolio-label shrink-0 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  className="form-input min-h-[4.5rem] flex-1 resize-none py-2.5 sm:min-h-[5.5rem] sm:py-3.5"
                  placeholder="Your message..."
                />
                    {errors.message && <span className="text-portfolio-body shrink-0 text-[color:var(--accent)] mt-1 block">Required</span>}
              </div>

                  <button 
                type="submit" 
                disabled={isLoading} 
                    className="btn-contact mt-1 w-full shrink-0 justify-center py-2.5 sm:py-3"
              >
                {isLoading ? 'Sending...' : 'Send message'}
                {!isLoading && <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />}
              </button>

              {isSubmitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="shrink-0 text-center text-portfolio-body text-green-600 dark:text-green-400"
                    >
                  Message sent successfully!
                    </motion.p>
                  )}
                </form>

                <div className="mt-4 shrink-0 border-t border-[color:var(--border-subtle)] pt-4 sm:mt-5 sm:pt-5">
                  <p className="text-portfolio-label mb-2 text-sm sm:mb-3 sm:text-base">Or reach out directly</p>
                  <a
                    href="mailto:adhanaesaw@gmail.com"
                    className="text-portfolio-body-strong text-base hover:text-[color:var(--accent)] transition-colors sm:text-lg"
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
