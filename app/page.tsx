'use client';

import Image from 'next/image';
import AnimatedElement from './components/AnimatedElement';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  useTheme();

  return (
    <main className="min-h-screen flex items-center justify-center theme-bg pt-16">
      <div className="max-w-4xl w-full p-8 relative">
        {/* Decorative element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-radial from-[color:var(--accent-light)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-radial from-[color:var(--accent)]/10 to-transparent opacity-70 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
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

          <div className="text-center md:text-left">
            <AnimatedElement delay={0.2}>
              <h1 className="text-4xl font-bold mb-3 theme-text">
                Hi, I&apos;m <span className="theme-accent relative">
                  Esaw Adhana
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-[color:var(--accent)]/30"></span>
                </span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={0.3}>
              <p className="text-xl theme-text-secondary">
                Sophomore at Stanford University studying Computer Science.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0.4}>
              <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto md:mx-0">
                <div className="h-px flex-grow bg-[color:var(--card-accent)]"></div>
                <span className="text-sm text-[color:var(--foreground)] opacity-60">Stanford &apos;27</span>
                <div className="h-px flex-grow bg-[color:var(--card-accent)]"></div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedElement delay={0.5}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-[color:var(--accent)]/20 mr-2 flex-shrink-0"></span>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "GoLang", "C", "C++", "React"].map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.6}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-[color:var(--accent)]/20 mr-2 flex-shrink-0"></span>
                Current Focus
              </h2>
              <p className="theme-text-secondary">
                Preparing for my upcoming internship at Google on their Core User Protection team.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.7}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-[color:var(--accent)]/20 mr-2 flex-shrink-0"></span>
                Interests
              </h2>
              <p className="theme-text-secondary">
                Weightlifting, rock climbing, poker, piano, and learning Spanish (B2 level).
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </main>
  );
}