'use client';

/**
 * Identity pinned in a left rail, content scrolling past it.
 *
 * The nav lives in the rail rather than a fixed header bar, so nothing ever
 * overlays the text. Experience stays to one or two lines per role, in the
 * résumé's own words, because the résumé link in the rail carries the rest.
 *
 * Type scale, deliberately small: 13px meta and labels, 14.5px list items,
 * 15px body, 16px lead, 17px name and headings. Dates are tabular so they
 * align down the right edge of the project list.
 */
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SocialIcon, linkTarget } from './components/SocialIcon';
import { useTheme } from './context/ThemeContext';
import {
  contactCopy,
  contactNote,
  experience,
  identity,
  intro,
  joinTags,
  projectLinkLabel,
  projects,
  skillRows,
  socialLinks,
} from './lib/portfolio-data';
import {
  scrollToSection,
  useActiveSection,
  useContactForm,
} from './lib/portfolio-hooks';

const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(NAV.map((n) => n.id), 90);
  const contact = useContactForm();

  return (
    <main className="min-h-dvh bg-[color:var(--background)] px-6 pb-12 pt-12 text-[color:var(--foreground)]">
      {/*
        Flex so the photo is exactly as tall as the name + intro. Hairline
        only under the bio, not under the photo.
      */}
      <div className="mx-auto md:grid md:max-w-[55rem] md:grid-cols-[15rem_minmax(0,1fr)] md:gap-x-12 lg:max-w-[57rem] lg:gap-x-20">
        <div className="relative h-28 w-28 overflow-hidden border border-[color:var(--border-subtle)] bg-[color:var(--surface-alt)] md:h-full md:w-full">
          <Image
            src="/profile-picture.png"
            alt={identity.name}
            fill
            priority
            sizes="240px"
            className="object-cover object-[58%_20%]"
          />
        </div>

        <header className="mt-7 max-w-[37rem] border-[color:var(--border-subtle)] md:mt-0 md:border-b md:pb-6">
          <h1 className="heading-display text-[clamp(2.15rem,4.4vw,2.85rem)] leading-[1.05]">
            Hi! I&apos;m {identity.name}<span className="text-[color:var(--accent)]">.</span>
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
            {identity.credential}
          </p>
          <p className="mt-6 text-pretty text-[17px] leading-[1.7]">{intro}</p>
        </header>

        {/* ── Rail ─────────────────────────────────────────────────────────── */}
        <aside className="md:pt-6 md:self-start md:sticky md:top-12">
          <nav className="no-scrollbar mt-8 flex gap-5 overflow-x-auto border-y border-[color:var(--border-subtle)] py-3 md:mt-0 md:flex-col md:gap-2 md:border-0 md:py-3.5">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id, 40, { preferBottom: item.id === 'contact' })}
                aria-current={active === item.id ? 'true' : undefined}
                /* self-start keeps the focus ring hugging the label instead of
                   stretching the full width of the rail */
                className={`shrink-0 self-start text-left text-[14px] transition-colors ${
                  active === item.id
                    ? 'text-[color:var(--foreground)]'
                    : 'text-[color:var(--muted)] hover:text-[color:var(--foreground)]'
                }`}
              >
                <span
                  className={`mr-2 hidden w-[15px] text-[color:var(--accent)] transition-opacity md:inline-block ${
                    active === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden
                >
                  ·
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Wraps into a row on mobile, stacks in the rail on desktop */}
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 md:mt-4 md:flex-col md:gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                {...linkTarget(link.url)}
                className="text-link-muted flex items-center gap-2 self-start text-[13px]"
              >
                <SocialIcon name={link.icon} className="h-[15px] w-[15px] shrink-0" />
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              /* pl matches a social icon (15px) plus its gap-2, so the label
                 lines up with the ones above it */
              className="self-start text-left text-[13px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)] md:mt-3.5 md:pl-[23px]"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </aside>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        {/*
          One measure for every prose block (37rem ≈ 70 characters) so the ragged
          right edge is consistent down the page. Project dates sit inside it too,
          rather than flying out to the full column width.
        */}
        <div>
          <Section id="experience" label="Experience" first>
            {experience.map((job, i) => (
              <article
                key={job.company}
                className={`max-w-[37rem] ${
                  i > 0 ? 'mt-7 border-t border-[color:var(--border-subtle)] pt-7' : ''
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <h3 className="text-[16px] font-medium tracking-[-0.005em]">{job.company}</h3>
                  <span className="text-[13px] tabular-nums text-[color:var(--muted)]">{job.timeline}</span>
                </div>

                <p className="mt-2 text-pretty text-[15px] leading-[1.6] text-[color:var(--muted)]">
                  {job.role}
                  {job.team && ` · ${job.team}`}
                </p>

                <ul className="mt-3.5 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="grid grid-cols-[0.9rem_minmax(0,1fr)] text-[14.5px] leading-[1.65] text-[color:var(--muted)]"
                    >
                      <span className="select-none leading-[1.65]" aria-hidden>
                        ·
                      </span>
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Section>

          <Section id="projects" label="Projects">
            {projects.map((project, i) => (
              <article
                key={project.title}
                className={`max-w-[37rem] ${
                  i > 0 ? 'mt-8 border-t border-[color:var(--border-subtle)] pt-8' : ''
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <h3 className="text-[16px] font-medium tracking-[-0.005em]">{project.title}</h3>
                  <span className="text-[13px] tabular-nums text-[color:var(--muted)]">{project.timeline}</span>
                </div>

                <p className="mt-2 text-pretty text-[15px] leading-[1.6] text-[color:var(--muted)]">
                  {project.description}
                </p>

                <ul className="mt-3.5 space-y-2">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="grid grid-cols-[0.9rem_minmax(0,1fr)] text-[14.5px] leading-[1.65] text-[color:var(--muted)]"
                    >
                      <span className="select-none leading-[1.65]" aria-hidden>
                        ·
                      </span>
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[13px] text-[color:var(--muted)]">
                  {project.link && (
                    <>
                      <a href={project.link} {...linkTarget(project.link)} className="text-link">
                        {projectLinkLabel(project)}
                        <ArrowUpRight
                          className="ml-0.5 inline h-3.5 w-3.5 -translate-y-px"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </a>
                      <span className="text-[color:var(--border-subtle)]" aria-hidden>
                        /
                      </span>
                    </>
                  )}
                  <span>{joinTags(project.technologies)}</span>
                </p>
              </article>
            ))}
          </Section>

          <Section id="about" label="About">
            {/* Wider than the prose measure on purpose: these are one-line rows, not paragraphs. */}
            <dl className="max-w-[42rem] space-y-4">
              {skillRows.map(({ label, items }) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[13px] leading-[1.7] text-[color:var(--muted)]">{label}</dt>
                  <dd className="text-pretty text-[15px] leading-[1.7]">{joinTags(items)}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="contact" label="Contact">
            <p className="max-w-[37rem] text-pretty text-[15px] leading-[1.7] text-[color:var(--muted)]">
              {contactCopy}
            </p>
            <p className="mt-3.5 text-[15px]">
              <a href={`mailto:${identity.email}`} className="text-link">
                {identity.email}
              </a>
            </p>

            <form onSubmit={contact.submit} className="mt-8 max-w-[37rem]">
              <p className="text-[13px] text-[color:var(--muted)]">Or use the form. {contactNote}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Name" error={contact.errors.name ? 'Required' : undefined}>
                  <input
                    {...contact.register('name', { required: true })}
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" error={contact.errors.email ? 'Needs to be a real one' : undefined}>
                  <input
                    {...contact.register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Message" error={contact.errors.message ? 'Required' : undefined}>
                  <textarea
                    {...contact.register('message', { required: true })}
                    rows={4}
                    className={`${inputClass} resize-none leading-[1.6]`}
                  />
                </Field>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={contact.isLoading}
                  className="border border-[color:var(--border-subtle)] px-4 py-2 text-[14px] transition-colors hover:border-[color:var(--foreground)] disabled:opacity-50"
                >
                  {contact.isLoading ? 'Sending' : 'Send'}
                </button>
                {contact.isSubmitted && <span className="text-[14px] text-[color:var(--muted)]">Sent. Thanks.</span>}
                {contact.error && <span className="text-[14px] text-[color:var(--accent)]">{contact.error}</span>}
              </div>
            </form>
          </Section>
        </div>

        <footer className="mt-24 border-t border-[color:var(--border-subtle)] pt-6 md:col-span-2">
          <p className="text-center text-[13px] tabular-nums text-[color:var(--muted)]">
            © {new Date().getFullYear()} {identity.name}
          </p>
        </footer>
      </div>
    </main>
  );
}

const inputClass =
  'w-full border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[color:var(--accent)]';

function Section({
  id,
  label,
  first = false,
  children,
}: {
  id: string;
  label: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-8 ${first ? 'mt-10' : 'mt-16'}`}>
      <h2 className="mb-6 text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)]">{label}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[13px] text-[color:var(--muted)]">{label}</span>
        {error && <span className="text-[12px] text-[color:var(--accent)]">{error}</span>}
      </span>
      {children}
    </label>
  );
}
