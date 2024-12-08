import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com/graphql';

async function getContributionsData() {
	const query = `
    query {
      user(login: "kabeerx9") {
        name
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalRepositoriesWithContributedPullRequests
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(first: 100, privacy: PUBLIC) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        pullRequests(first: 1) {
          totalCount
        }
      }
    }
  `;

	const response = await fetch(GITHUB_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	});

	const data = await response.json();
	return data;
}

export async function GET() {
	try {
		const data = await getContributionsData();
		return NextResponse.json(data);
	} catch {
		return NextResponse.json(
			{ error: 'Failed to fetch GitHub data' },
			{ status: 500 }
		);
	}
}
