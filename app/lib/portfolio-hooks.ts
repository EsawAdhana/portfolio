'use client';

/**
 * Shared behavior for the portfolio page: contact form submission, section
 * scrolling, and active-section tracking.
 */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from './portfolio-data';

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function useContactForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        { from_name: data.name, reply_to: data.email, message: data.message },
        { publicKey: emailjsConfig.publicKey }
      );
      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        onSuccess?.();
      }, 2200);
    } catch {
      setError('Could not send that. Email me directly and I will still get it.');
    } finally {
      setIsLoading(false);
    }
  });

  return { register, submit, errors, isLoading, isSubmitted, error };
}

/**
 * Scrolls a section into view under a fixed header of `headerHeight` px.
 * `preferBottom` (use it for the last section) scrolls all the way down when the
 * section already fits, so the footer lands in view instead of hanging below.
 */
export function scrollToSection(
  id: string,
  headerHeight = 56,
  { preferBottom = false }: { preferBottom?: boolean } = {}
) {
  const element = document.getElementById(id);
  if (!element) return;

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: preferBottom && top > maxScroll ? maxScroll : top,
    behavior: 'smooth',
  });
}

/** Returns the id of the section currently closest to the top of the viewport. */
export function useActiveSection(ids: string[], offset = 120): string {
  const [active, setActive] = useState(ids[0] ?? '');
  const idsKey = ids.join(',');

  useEffect(() => {
    const sectionIds = idsKey.split(',');

    const onScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      // Bottom of the page always resolves to the last section.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [idsKey, offset]);

  return active;
}
