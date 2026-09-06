'use client';

import { Github, Linkedin, Instagram, Mail, FileText } from 'lucide-react';
import type { SocialLink } from '../lib/portfolio-data';

const icons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  resume: FileText,
  mail: Mail,
} as const;

export function SocialIcon({
  name,
  className = 'w-5 h-5',
  /** Lucide defaults to 2, which reads heavy next to 13px text. */
  strokeWidth = 1.5,
}: {
  name: SocialLink['icon'];
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/** Anchor props that make external links safe and mailto links behave. */
export function linkTarget(url: string) {
  const external = url.startsWith('http');
  return {
    target: external ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
  };
}
