'use client';

import Image from 'next/image';
import AnimatedElement from './components/AnimatedElement';
import { useTheme } from './context/ThemeContext';

export default function Home() {
 useTheme();

  return (
    <main className="min-h-screen flex items-center justify-center theme-bg pt-16">
      <div className="max-w-4xl w-full p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
          <AnimatedElement>
            <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
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
              <h1 className="text-4xl font-bold mb-4 theme-text">
                Hi, I&apos;m Esaw Adhana.
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={0.3}>
              <p className="text-xl theme-text-secondary">
                Sophomore at Stanford University studying Computer Science.
              </p>
            </AnimatedElement>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedElement delay={0.5}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "GoLang", "C", "C++", "React"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.6}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text">
                Current Focus
              </h2>
              <p className="theme-text-secondary">
                Preparing for my upcoming internship at Google on their Core User Protection team.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.7}>
            <div className="p-6 theme-card">
              <h2 className="text-xl font-bold mb-4 theme-text">
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