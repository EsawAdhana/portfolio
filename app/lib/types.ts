// app/lib/types.ts
export type ProjectType = {
  title: string;
  description: string;
  technologies: string[];
  timeline: string;
  points: string[];
  link?: string;
  /** Overrides hostname shown next to external-link icon (e.g. "Read Paper" for a PDF) */
  linkLabel?: string;
  /** Shown under the live link (e.g. access requirements) */
  linkNote?: string;
  /** Public paths under `/public`, e.g. `/projects/foo/01.png` */
  gallery?: string[];
};