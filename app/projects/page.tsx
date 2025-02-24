import type { ProjectType } from '@/app/lib/types';

const projects: ProjectType[] = [
  {
    title: "PropaGONE",
    description: "Extension to identify and highlight propaganda and misinformation in news articles",
    technologies: ["Python", "React", "JavaScript", "Claude-3 Opus API"],
    timeline: "Apr. 2024 – June 2024",
    points: [
      "Deployed extension to identify and highlight propaganda and misinformation in news articles",
      "Administered speedy feedback and analysis to users through highlighting and text tooltips in seconds",
      "Co-authored research paper and delivered presentation for Stanford's CS 197 class"
    ],
    link: "#" // Add your project link here
  },
  {
    title: "Bare-metal Console",
    description: "Command-executing console written entirely from scratch",
    technologies: ["C", "Assembly"],
    timeline: "Jan. 2024 – Mar. 2024",
    points: [
      "Programmed command-executing console written entirely from scratch",
      "Designed custom I/O handling, capable of displaying results to screen",
      "Launched on Mango Pi platform with 14 self-written modules"
    ],
    link: "#"
  },
  {
    title: "Poker Simulator",
    description: "Program capable of running simulated games of No-Limits Texas Hold'Em",
    technologies: ["Java"],
    timeline: "June. 2023 – Aug. 2023",
    points: [
      "Developed program capable of running simulated games of No-Limits Texas Hold'Em",
      "Calculates hand equity through Monte Carlo simulations, iterating through possible hands"
    ],
    link: "#"
  }
];

export default function Projects() {
  return (
    <main className="min-h-screen pt-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h1>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                {project.points.map((point, pointIndex) => (
                  <p 
                    key={pointIndex}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    • {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}