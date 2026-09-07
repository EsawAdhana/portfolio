/**
 * Content for the portfolio page.
 *
 * Rule for this file: nothing invented. Facts come from the resume
 * (`public/resume.pdf`), prose comes from the live site where it already exists.
 * No stat tiles, no metric badges, no availability banners.
 *
 * Experience, projects and skills mirror the resume one-to-one on titles, dates
 * and categories, and every bullet below is a resume line verbatim, so the two
 * never say the same thing in different words. The site stays shorter by keeping
 * only the resume's leading bullets per role, never by rewording them. Anything
 * the resume does not carry (Let 'em Cook, the one-line project descriptions,
 * the contact copy) is site-only.
 */
import type { ProjectType } from './types';

export const identity = {
  name: 'Esaw Adhana',
  email: 'adhanaesaw@gmail.com',
  /** The masthead's second line, under the name. */
  credential: "Stanford '27 / B.S. & M.S. Computer Science",
} as const;

/** His words, verbatim. */
export const intro =
  "This past summer, I worked as a founding engineer at Human Behavior, an AI product analytics startup. Previously interned at Google and Uber as a SWE. On the side I like building consumer apps: most recently Stanford Root, used by 7k+ Stanford students.";

/** Verbatim from the live site's contact section. */
export const contactCopy =
  "I'm always interested in hearing about new opportunities, interesting projects, or just connecting to meet someone new!";

export const contactNote = "I'll get back to you as soon as I can.";

export type ExperienceType = {
  company: string;
  role: string;
  team?: string;
  timeline: string;
  location: string;
  points: string[];
};

export const experience: ExperienceType[] = [
  {
    company: 'Human Behavior',
    role: 'Founding Engineer',
    team: 'AI product analytics startup (YC X25)',
    timeline: 'Jun. 2026 – Present',
    location: 'San Francisco, CA',
    points: [
      'Scaled the ClickHouse-backed ingestion pipeline to 78K sessions/day, serving 10+ customers at $100K+ ARR',
      'Designed the runtime that lets customers deploy scheduled analytics agents to Slack, SMS, and email',
    ],
  },
  {
    company: 'Google',
    role: 'Software Engineering Intern',
    team: 'On-Device Abuse Protection',
    timeline: 'Jun. 2025 – Sep. 2025',
    location: 'Sunnyvale, CA',
    points: [
      'Cut abuse protection rollout times from hours to minutes for 20+ teams by consolidating redundant deploy steps',
    ],
  },
  {
    company: 'Uber',
    role: 'Software Engineering Intern',
    team: 'Matching Intent',
    timeline: 'Jun. 2024 – Sep. 2024',
    location: 'San Francisco, CA',
    points: [
      'Implemented a cross-sell pop-up offering Wait & Save to UberX riders to reduce high-demand matching churn',
    ],
  },
];

export const projects: ProjectType[] = [
  {
    title: 'Stanford Root',
    description: 'Course discovery mobile + web app for the Stanford student community',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    timeline: 'Jan. 2026 – Present',
    points: [
      'Built a Stanford course discovery platform now used by 7,000+ students, grown by word of mouth',
      'Added multi-filter search, waitlist and enrollment tracking, and schedule sync across devices',
    ],
    link: 'https://stanfordroot.com',
  },
  {
    title: "Let 'em Cook",
    description: 'Social cooking app for young adults, focus on building community and trying new things',
    technologies: ['React Native', 'TypeScript', 'Supabase'],
    timeline: 'Sep. 2025 – Dec. 2025',
    points: [
      'Built social mobile app allowing users to create + join cooking competitions with fellow users and then cook and digitally share their creations with one another',
      'Led our four-person team through all stages of the CS 147 design cycle, from early prototyping to final product, incorporating user feedback throughout, and winning the Best Demo Award for our final app',
    ],
    link: 'https://drive.google.com/file/d/1kHhZZl14B-Hb_R81ZOof3qjxgM-Ytlwy/view?usp=sharing',
    linkLabel: 'Demo video',
  },
  {
    title: 'MonkeyHouse',
    description: 'Roommate matching web app for interns moving to a new city for the summer',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'OpenAI API'],
    timeline: 'Apr. 2025 – Jun. 2025',
    points: [
      'Shipped an intern roommate matching web app that pairs users on survey-driven compatibility',
      'Designed a weighted scoring engine with OpenAI free-text parsing to flag preference conflicts and rank matches',
    ],
  },
  {
    title: 'ScentSync',
    description: 'Eco-friendly beauty routine recommender built on the EWG product database',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'OpenAI API'],
    timeline: 'Jan. 2025 – Mar. 2025',
    points: [
      'Launched an eco-friendly routine recommender over 1,000+ Environmental Working Group (EWG) beauty products',
      'Engineered a web scraping module to collect, structure, and query product data from the EWG database',
    ],
  },
  {
    title: 'PropaGONE',
    description: 'Chrome extension integrating Claude to detect propaganda and manipulative language',
    technologies: ['React', 'Python', 'JavaScript', 'Claude API'],
    timeline: 'Apr. 2024 – Jun. 2024',
    points: [
      'Developed a Chrome extension using Claude that flags and explains manipulative language in news articles',
      'Added thumbs up/down feedback to tune prompts and few-shot examples to improve detection accuracy',
    ],
    link: 'https://drive.google.com/file/d/1dMb5b81XKFC9oI6_AM7halHBLDNUwOXV/view?usp=sharing',
    linkLabel: 'Read Paper',
  },
];

export type SocialLink = {
  name: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'instagram' | 'resume' | 'mail';
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/EsawAdhana', handle: 'github.com/EsawAdhana', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/esawadhana', handle: 'linkedin.com/in/esawadhana', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://instagram.com/esaw.adhana', handle: 'instagram.com/esaw.adhana', icon: 'instagram' },
  { name: 'Resume', url: '/resume.pdf', handle: 'resume.pdf', icon: 'resume' },
  { name: 'Email', url: 'mailto:adhanaesaw@gmail.com', handle: 'adhanaesaw@gmail.com', icon: 'mail' },
];

/* ── Skills ──────────────────────────────────────────────────────────────────
   Categories match the resume's rows exactly, so the two never drift.  */

export const languages = ['TypeScript', 'Python', 'Go', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'HTML', 'CSS'];
export const frameworks = ['Next.js', 'React', 'React Native', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Puppeteer', 'Cheerio'];
export const data = ['ClickHouse', 'PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'];
export const aiInfrastructure = ['OpenAI API', 'Claude API', 'MCP', 'AWS (S3)', 'Docker', 'Git', 'GitHub'];
export const interests = [
  'Spanish (B2)',
  'investing',
  'poker',
  'weightlifting',
  'bouldering',
  'bullet chess',
  'coffee',
];

/** The rows the live About section renders, in order. */
export const skillRows: { label: string; items: string[] }[] = [
  { label: 'Languages', items: languages },
  { label: 'Frameworks', items: frameworks },
  { label: 'Data', items: data },
  { label: 'AI and Infrastructure', items: aiInfrastructure },
  { label: 'Interests', items: interests },
];

export const emailjsConfig = {
  serviceId: 'service_k6jevbu',
  templateId: 'template_j214qi4',
  publicKey: 'mDlMd4fMOp_qwT6cA',
} as const;

export function linkDisplayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Open link';
  }
}

/**
 * Joins a tag list for display. Spaces inside a tag become non-breaking, so a
 * line can only break at a comma: "Bullet chess" and "Tailwind CSS" never end
 * up split across two lines, where they'd read as two separate items.
 */
export function joinTags(items: readonly string[]): string {
  return items.map((item) => item.replace(/ /g, '\u00a0')).join(', ');
}

export function projectLinkLabel(project: ProjectType): string {
  if (project.linkLabel) return project.linkLabel;
  if (!project.link) return '';
  return linkDisplayHost(project.link);
}
