'use client';

import { useEffect } from 'react';

// This component sets the theme class immediately when the page loads
// to prevent flash of incorrect theme
export default function ThemeScript() {
  useEffect(() => {
    // On component mount, apply the theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
}