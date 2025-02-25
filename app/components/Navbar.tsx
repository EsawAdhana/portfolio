'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              EA
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? 
                <Sun className="w-5 h-5 text-gray-300" /> : 
                <Moon className="w-5 h-5 text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;