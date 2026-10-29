'use client';

import { useState } from 'react';
import type { ContributionDay, GitHubActivity } from '@/lib/github';

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const OPACITY = [0, 0.3, 0.5, 0.75, 1];

export function ContributionGraph({ data, profileUrl }: { data: GitHubActivity; profileUrl: string }) {
  const [active, setActive] = useState<ContributionDay | null>(null);
  const width = data.weeks.length * STEP - GAP;
  const height = 7 * STEP - GAP;

  const stats = [
    { label: 'Contributions', value: data.total },
    data.privateCount !== null && { label: 'In private repos', value: data.privateCount },
    data.mergedPrs !== null && { label: 'Merged PRs', value: data.mergedPrs },
    { label: 'Longest streak', value: data.longestStreak, unit: 'd' },
  ].filter(Boolean) as { label: string; value: number; unit?: string }[];

  return (
    <figure>
      <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.label}>
            <dt className="font-mono text-xs text-faint">{s.label}</dt>
            <dd className="mt-1 text-[20px] font-medium tabular-nums text-fg">
              {s.value.toLocaleString('en-US')}
              {s.unit && <span className="ml-0.5 text-[14px] text-muted">{s.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${data.total.toLocaleString('en-US')} GitHub contributions in the last year`}
        onMouseLeave={() => setActive(null)}
      >
        {data.weeks.map((week, x) =>
          week.map((day, y) =>
            day && (
              <rect
                key={day.date}
                x={x * STEP}
                y={y * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                className={`cursor-pointer transition-[stroke] ${day.level === 0 ? 'fill-tile' : 'fill-live'} ${active?.date === day.date ? 'stroke-fg' : 'stroke-transparent'}`}
                strokeWidth={1}
                fillOpacity={day.level === 0 ? 1 : OPACITY[day.level]}
                onMouseEnter={() => setActive(day)}
                onClick={() => setActive(day)}
              />
            ),
          ),
        )}
      </svg>

      <p className="mt-4 min-h-[20px] font-mono text-xs leading-relaxed text-muted" aria-live="polite">
        {active ? <DayDetail day={active} /> : <span className="text-faint">Hover or tap a day to see what I worked on</span>}
      </p>

      <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-faint">
        <a href={profileUrl} target="_blank" rel="noreferrer" className="link">
          {data.currentStreak > 0 ? `${data.currentStreak}-day streak · ` : ''}View on GitHub
        </a>
        <span className="hidden items-center gap-1.5 sm:flex" aria-hidden>
          Less
          {OPACITY.map((o, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-[2px] ${i === 0 ? 'bg-tile' : 'bg-live'}`}
              style={i === 0 ? undefined : { opacity: o }}
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}

function DayDetail({ day }: { day: ContributionDay }) {
  const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const publicCommits = day.repos.reduce((sum, r) => sum + r.commits, 0);
  const rest = day.count - publicCommits;

  return (
    <>
      <span className="text-fg">{date}</span>
      {' · '}
      {day.count === 0 ? 'No contributions' : `${day.count} contribution${day.count === 1 ? '' : 's'}`}
      {day.repos.map(r => (
        <span key={r.name}>{` · ${r.name} ${r.commits}`}</span>
      ))}
      {day.repos.length > 0 && rest > 0 && <span className="text-faint">{` · +${rest} private or other`}</span>}
    </>
  );
}
