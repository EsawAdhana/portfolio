'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { EmailIcon, GithubIcon, LinkedInIcon, InstagramIcon } from '@/app/components/icons';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function About() {
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
    <main className="min-h-screen pt-24 bg-[#0a0a1e] text-white">
      <div className="max-w-2xl mx-auto p-8">
        {/* Contact Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
          <div className="bg-[#1a1a2e] rounded-lg p-6 space-y-4">
            <a 
              href="mailto:adhanaesaw@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2a2a3e]"
            >
              <EmailIcon />
              adhanaesaw@gmail.com
            </a>
            
            <a 
              href="https://github.com/EsawAdhana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2a2a3e]"
            >
              <GithubIcon />
              GitHub
            </a>
            
            <a 
              href="https://linkedin.com/in/EsawAdhana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2a2a3e]"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            
            <a 
              href="https://instagram.com/esaw.adhana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2a2a3e]"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1a1a2e] rounded-lg p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full px-4 py-2 bg-[#2a2a3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                className="w-full px-4 py-2 bg-[#2a2a3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                {...register("message", { required: true })}
                rows={4}
                className="w-full px-4 py-2 bg-[#2a2a3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              />
              {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {isSubmitted && (
              <div className="text-green-400 text-center">
                Message sent successfully!
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}