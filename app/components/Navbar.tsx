'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[color:var(--background)]/80 dark:bg-[color:var(--background)]/80 border-b border-[color:var(--card-accent)] dark:border-[color:var(--card-accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="relative text-xl font-bold theme-accent">
              <span className="relative z-10">EA</span>
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-[color:var(--accent-light)]/30 dark:bg-[color:var(--accent-light)]/20 rounded-sm"></span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <NavLink href="/" active={isActive('/')}>
              Home
            </NavLink>
            <NavLink href="/projects" active={isActive('/projects')}>
              Projects
            </NavLink>
            <NavLink href="/about" active={isActive('/about')}>
              About
            </NavLink>
            <button 
              onClick={toggleTheme} 
              className="ml-3 p-2 rounded-lg bg-[color:var(--card-accent)] dark:bg-[color:var(--card-accent)] hover:bg-[color:var(--accent-light)]/30 dark:hover:bg-[color:var(--accent-light)]/20 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? 
                <Sun className="w-5 h-5 text-[color:var(--accent)]" /> : 
                <Moon className="w-5 h-5 text-[color:var(--accent)]" />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all ${
        active 
          ? 'text-[color:var(--accent)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[color:var(--accent)]' 
          : 'text-[color:var(--foreground)] hover:text-[color:var(--accent)] opacity-80'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;