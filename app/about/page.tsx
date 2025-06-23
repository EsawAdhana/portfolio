'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

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
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 theme-bg pb-16 font-geist relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-gradient-radial from-[color:var(--accent-light)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-gradient-radial from-[color:var(--accent)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-light)]">Get In Touch</h1>
          <p className="theme-text-secondary text-lg">
            Feel free to reach out for collaborations, questions, or just to say hello!
          </p>
        </motion.div>

        {/* Side by side layout container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Links */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <h2 className="text-2xl font-bold mb-6 theme-text flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-[color:var(--accent)]/20 mr-2 flex-shrink-0"></span>
              Connect With Me
            </h2>
            <div className="theme-card p-6 space-y-6 h-full">
              <a 
                href="mailto:adhanaesaw@gmail.com"
                className="flex items-center gap-4 theme-text hover:text-[color:var(--accent)] transition-colors p-3 rounded-lg hover:bg-[color:var(--card-accent)]"
              >
                <div className="w-12 h-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <span className="font-medium text-lg">adhanaesaw@gmail.com</span>
              </a>
              
              <a 
                href="https://github.com/EsawAdhana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 theme-text hover:text-[color:var(--accent)] transition-colors p-3 rounded-lg hover:bg-[color:var(--card-accent)]"
              >
                <div className="w-12 h-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center">
                  <Github className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <span className="font-medium text-lg">GitHub</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/EsawAdhana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 theme-text hover:text-[color:var(--accent)] transition-colors p-3 rounded-lg hover:bg-[color:var(--card-accent)]"
              >
                <div className="w-12 h-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <span className="font-medium text-lg">LinkedIn</span>
              </a>
              
              <a 
                href="https://instagram.com/esaw.adhana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 theme-text hover:text-[color:var(--accent)] transition-colors p-3 rounded-lg hover:bg-[color:var(--card-accent)]"
              >
                <div className="w-12 h-12 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <span className="font-medium text-lg">Instagram</span>
              </a>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-1/2"
          >
            <h2 className="text-2xl font-bold mb-6 theme-text flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-[color:var(--accent)]/20 mr-2 flex-shrink-0"></span>
              Send Me a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="theme-card p-8 space-y-5">
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
          </motion.section>
        </div>
      </div>
    </main>
  );
}