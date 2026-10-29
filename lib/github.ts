export interface ContributionDay {
  date: string;
  level: number;
  count: number;
  /** Commits in public repositories; the rest of `count` is private or non-commit work. */
  repos: { name: string; commits: number }[];
}

export interface GitHubActivity {
  total: number;
  /** Contributions to private repositories, shown only as a count. Null without a token. */
  privateCount: number | null;
  /** Merged pull requests in public repositories. Null without a token. */
  mergedPrs: number | null;
  longestStreak: number;
  currentStreak: number;
  weeks: (ContributionDay | null)[][];
}

const DAY = 86_400_000;
const REVALIDATE = 60 * 60 * 24;

// GITHUB_TOKEN is a fine-grained token limited to public repositories, so nothing here
// can name a private repo. Without it (or if it expires) fall back to the public
// calendar fragment the profile page loads; on any failure the section is left out.
export async function getActivity(user: string): Promise<GitHubActivity | null> {
  const days = (process.env.GITHUB_TOKEN && (await fromApi(user, process.env.GITHUB_TOKEN))) || (await fromCalendar(user));
  if (!days) return null;
  return { ...days.extra, ...summarize(days.days) };
}

interface Fetched {
  days: ContributionDay[];
  extra: Pick<GitHubActivity, 'privateCount' | 'mergedPrs'>;
}

const QUERY = `query($login: String!, $merged: String!) {
  user(login: $login) {
    contributionsCollection {
      restrictedContributionsCount
      contributionCalendar {
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
      commitContributionsByRepository(maxRepositories: 100) {
        repository { name isPrivate }
        contributions(first: 100) { nodes { occurredAt commitCount } }
      }
    }
  }
  search(query: $merged, type: ISSUE) { issueCount }
}`;

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface ApiResponse {
  data?: {
    user: {
      contributionsCollection: {
        restrictedContributionsCount: number;
        contributionCalendar: {
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
        };
        commitContributionsByRepository: {
          repository: { name: string; isPrivate: boolean };
          contributions: { nodes: { occurredAt: string; commitCount: number }[] };
        }[];
      };
    } | null;
    search: { issueCount: number };
  };
}

async function fromApi(user: string, token: string): Promise<Fetched | null> {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { login: user, merged: `author:${user} is:pr is:merged` } }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const { data } = (await res.json()) as ApiResponse;
    const collection = data?.user?.contributionsCollection;
    if (!collection) return null;

    const repos = new Map<string, { name: string; commits: number }[]>();
    for (const { repository, contributions } of collection.commitContributionsByRepository) {
      if (repository.isPrivate) continue;
      for (const { occurredAt, commitCount } of contributions.nodes) {
        const date = occurredAt.slice(0, 10);
        (repos.get(date) ?? repos.set(date, []).get(date)!).push({ name: repository.name, commits: commitCount });
      }
    }

    const days = collection.contributionCalendar.weeks.flatMap(w =>
      w.contributionDays.map(d => ({
        date: d.date,
        level: LEVELS[d.contributionLevel] ?? 0,
        count: d.contributionCount,
        repos: (repos.get(d.date) ?? []).sort((a, b) => b.commits - a.commits),
      })),
    );

    return {
      days,
      extra: { privateCount: collection.restrictedContributionsCount, mergedPrs: data.search.issueCount },
    };
  } catch {
    return null;
  }
}

async function fromCalendar(user: string): Promise<Fetched | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const days = parseCalendar(await res.text());
    return days.length ? { days, extra: { privateCount: null, mergedPrs: null } } : null;
  } catch {
    return null;
  }
}

function parseCalendar(html: string): ContributionDay[] {
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
    days.push({ date, level: Number(level), count: (id && counts.get(id)) || 0, repos: [] });
  }
  return days;
}

function summarize(input: ContributionDay[]) {
  const days = [...input].sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }
  // Today may simply not have activity yet, so a streak ending yesterday still counts.
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let currentStreak = 0;
  for (; i >= 0 && days[i].count > 0; i--) currentStreak++;

  const first = new Date(`${days[0].date}T00:00:00Z`);
  const start = first.getTime() - first.getUTCDay() * DAY;
  const weeks: (ContributionDay | null)[][] = [];
  for (const day of days) {
    const t = new Date(`${day.date}T00:00:00Z`);
    const week = Math.floor((t.getTime() - start) / (7 * DAY));
    (weeks[week] ??= Array(7).fill(null))[t.getUTCDay()] = day;
  }

  return { total: days.reduce((sum, d) => sum + d.count, 0), longestStreak, currentStreak, weeks };
}
