import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { profile, projects, work } from '@/lib/content';
import { getActivity } from '@/lib/github';
import { ContributionGraph } from './contribution-graph';

export default async function Home() {
  const contributions = await getActivity(profile.github.split('/').pop()!);

  return (
    <main className="mx-auto max-w-[640px] px-5 pb-24 pt-20 sm:pt-28">
      <header className="reveal" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="flex items-center gap-4">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={56}
            height={56}
            priority
            className="avatar"
          />
          <div className="min-w-0">
            <h1 className="text-[17px] font-medium text-fg">{profile.name}</h1>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[15px] text-muted">
              {profile.role}
              <span aria-hidden className="hidden text-faint sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <MapPin size={13} strokeWidth={1.75} aria-hidden />
                {profile.location}
              </span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-fg/90">{profile.intro}</p>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Links">
          <Chip href={profile.github} icon={<Github size={14} strokeWidth={1.75} />}>GitHub</Chip>
          <Chip href={profile.linkedin} icon={<Linkedin size={14} strokeWidth={1.75} />}>LinkedIn</Chip>
          <Chip href={profile.resume} icon={<FileText size={14} strokeWidth={1.75} />}>Resume</Chip>
          <Chip href={`mailto:${profile.email}`} icon={<Mail size={14} strokeWidth={1.75} />}>Email</Chip>
        </nav>
      </header>

      <Section title="Work" index={1}>
        <ol className="space-y-12">
          {work.map(job => (
            <li key={job.company}>
              <div className="flex items-center gap-3.5">
                <span className="logo-tile">
                  <Image src={job.logo} alt="" width={28} height={28} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[15px] font-medium text-fg">
                      {job.url
                        ? <a href={job.url} target="_blank" rel="noreferrer" className="link">{job.company}</a>
                        : job.company}
                    </h3>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{job.period}</span>
                  </div>
                  <p className="text-[14px] text-muted">{job.role}</p>
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/90">{job.summary}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map(h => (
                  <li key={h} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
                    {h}
                  </li>
                ))}
              </ul>
              {job.links && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.links.map(l => (
                    <Chip key={l.href} href={l.href} icon={<AppleIcon />}>{l.label}</Chip>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Projects" index={2}>
        <ul className="-mx-3">
          {projects.map(p => {
            const Icon = p.icon;
            return (
              <li key={p.name}>
                <a href={p.live ?? p.repo} target="_blank" rel="noreferrer" className="row group">
                  <span className="icon-tile">
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[15px] font-medium text-fg">
                      {p.name}
                      {p.live && <span className="rounded-full bg-live/15 px-1.5 py-px font-mono text-[10px] font-normal uppercase tracking-wide text-live">Live</span>}
                      <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden className="arrow text-faint" />
                    </span>
                    <span className="mt-0.5 block text-[14px] leading-relaxed text-muted">{p.description}</span>
                    <span className="mt-2 block font-mono text-xs text-faint">{p.tech.join(' / ')}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <a href={profile.github} target="_blank" rel="noreferrer" className="link mt-6 inline-flex items-center gap-1.5 text-[14px] text-muted">
          <Github size={14} strokeWidth={1.75} aria-hidden />
          Everything else on GitHub
        </a>
      </Section>

      {contributions && (
        <Section title="GitHub" index={3}>
          <ContributionGraph data={contributions} profileUrl={profile.github} />
        </Section>
      )}

      <Section title="Stack" index={4}>
        <p className="font-mono text-[13px] leading-loose text-muted">{profile.stack.join('  ·  ')}</p>
      </Section>

      <footer className="reveal mt-24 flex items-center justify-between border-t border-line pt-6 text-xs text-faint" style={{ '--i': 5 } as React.CSSProperties}>
        <a href={`mailto:${profile.email}`} className="link font-mono">{profile.email}</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

function Section({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  return (
    <section className="reveal mt-20" style={{ '--i': index } as React.CSSProperties} aria-labelledby={title}>
      <h2 id={title} className="mb-8 font-mono text-xs uppercase tracking-[0.12em] text-faint">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      className="chip"
    >
      <span aria-hidden className="text-muted">{icon}</span>
      {children}
    </a>
  );
}

function AppleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.4-3.69ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28Z" />
    </svg>
  );
}
