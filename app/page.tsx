'use client';

import Image from 'next/image';
import AnimatedElement from './components/AnimatedElement';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a1e]">
      <div className="max-w-4xl w-full p-8">
        <div className="flex items-start gap-8 mb-16">
          <AnimatedElement>
            <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/profile-picture.png"
                alt="Esaw Adhana"
                fill
                className="object-cover scale-[1.2] object-[center_top]"
                priority
              />
            </div>
          </AnimatedElement>

          <div>
            <AnimatedElement delay={0.2}>
              <h1 className="text-4xl font-bold mb-4 text-white">
                I&apos;m Esaw Adhana.
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={0.3}>
              <p className="text-xl text-gray-300">
                Sophomore at Stanford University studying Computer Science.
              </p>
            </AnimatedElement>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedElement delay={0.5}>
            <div className="p-6 bg-[#1a1a2e] rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "GoLang", "C", "C++", "React"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.6}>
            <div className="p-6 bg-[#1a1a2e] rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">
                Current Focus
              </h2>
              <p className="text-gray-300">
                Preparing for my upcoming internship at Google on their Core User Protection team.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.7}>
            <div className="p-6 bg-[#1a1a2e] rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">
                Interests
              </h2>
              <p className="text-gray-300">
                Weightlifting, rock climbing, poker, piano, and learning Spanish (B2 level).
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </main>
  );
}