"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, GitFork, Star, GitPullRequest } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

interface GitHubData {
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalRepositoriesWithContributedPullRequests: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          contributionCount: number;
          date: string;
          color: string;
        }[];
      }[];
    };
  };
  repositories: {
    totalCount: number;
    nodes: {
      stargazerCount: number;
    }[];
  };
  pullRequests: {
    totalCount: number;
  };
}

function ContributionsGraph({ data }: { data: GitHubData }) {
  const { weeks } = data.contributionsCollection.contributionCalendar;

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.contributionDays.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  className={cn(
                    "w-3 h-3 rounded-sm",
                    "transition-colors duration-200",
                    "hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-600"
                  )}
                  style={{ backgroundColor: day.color }}
                  title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/github');
        const data = await response.json();
        setGithubData(data.data.user);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4" id="github-stats">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="GitHub Activity"
            subtitle="My open source contributions"
          />
          <div className="mt-16 h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800 dark:border-zinc-200" />
          </div>
        </div>
      </section>
    );
  }

  if (!githubData) return null;

  const stats = [
    {
      label: "Total Contributions",
      value: githubData.contributionsCollection.contributionCalendar.totalContributions.toLocaleString(),
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Pull Requests",
      value: githubData.pullRequests.totalCount.toLocaleString(),
      icon: <GitPullRequest className="w-5 h-5" />,
    },
    {
      label: "Repositories",
      value: githubData.repositories.totalCount.toLocaleString(),
      icon: <GitFork className="w-5 h-5" />,
    },
    {
      label: "Total Stars",
      value: githubData.repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0).toLocaleString(),
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-24 px-4" id="github-stats">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="GitHub Activity"
          subtitle="My open source contributions"
        />

        <div className="mt-16 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "p-4 rounded-xl text-center",
                  "bg-zinc-50 dark:bg-zinc-900/50",
                  "border border-zinc-200 dark:border-zinc-800"
                )}
              >
                <div className="flex justify-center mb-2 text-zinc-600 dark:text-zinc-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contributions Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "p-6 rounded-xl",
              "bg-zinc-50 dark:bg-zinc-900/50",
              "border border-zinc-200 dark:border-zinc-800"
            )}
          >
            <h3 className="text-lg font-semibold mb-4">Contribution Graph</h3>
            <ContributionsGraph data={githubData} />
            
            {/* Contribution Level Legend */}
            <div className="mt-4 flex items-center justify-end gap-2 text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Less</span>
              {[
                '#ebedf0',
                '#9be9a8',
                '#40c463',
                '#30a14e',
                '#216e39'
              ].map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="text-zinc-600 dark:text-zinc-400">More</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 