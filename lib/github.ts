export interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

export interface Contributions {
  total: number;
  weeks: (ContributionDay | null)[][];
}

// GitHub has no unauthenticated API for the contribution calendar, so read the same
// HTML fragment the profile page loads. Refreshed daily; on any failure the section is
// simply left out rather than breaking the build.
export async function getContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    return parse(await res.text());
  } catch {
    return null;
  }
}

function parse(html: string): Contributions | null {
  const counts = new Map<string, number>();
  for (const [, id, text] of Array.from(html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g))) {
    const n = text.match(/^(\d+) contribution/);
    counts.set(id, n ? Number(n[1]) : 0);
  }

  const days: ContributionDay[] = [];
  for (const [tag] of Array.from(html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g))) {
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    const level = tag.match(/data-level="(\d)"/)?.[1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    if (!date || !level) continue;
    days.push({ date, level: Number(level), count: (id && counts.get(id)) || 0 });
  }
  if (days.length === 0) return null;

  days.sort((a, b) => a.date.localeCompare(b.date));
  const first = new Date(`${days[0].date}T00:00:00Z`);
  const start = first.getTime() - first.getUTCDay() * 86_400_000;

  const weeks: (ContributionDay | null)[][] = [];
  for (const day of days) {
    const t = new Date(`${day.date}T00:00:00Z`);
    const week = Math.floor((t.getTime() - start) / (7 * 86_400_000));
    (weeks[week] ??= Array(7).fill(null))[t.getUTCDay()] = day;
  }

  return { total: days.reduce((sum, d) => sum + d.count, 0), weeks };
}
