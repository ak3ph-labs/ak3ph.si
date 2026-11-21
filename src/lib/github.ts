/**
 * GitHub repo stats, fetched once per build.
 *
 * Uses GITHUB_TOKEN when it is set (read-only, public repos) and calls the API
 * anonymously when it isn't. Any failure (network, rate limit, bad token, 404)
 * returns null so the page renders without stats and the build keeps passing.
 */

import { GITHUB_TOKEN } from 'astro:env/server';

export interface RepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  pushedAt: Date;
  archived: boolean;
}

const cache = new Map<string, Promise<RepoStats | null>>();
let warned = false;

async function load(repo: string): Promise<RepoStats | null> {
  const token = GITHUB_TOKEN?.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'ak3ph.si-build',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const r = (await res.json()) as Record<string, unknown>;
    const pushedAt = new Date(String(r.pushed_at));
    if (typeof r.stargazers_count !== 'number' || Number.isNaN(pushedAt.getTime())) {
      throw new Error('unexpected response');
    }
    return {
      stars: r.stargazers_count,
      forks: Number(r.forks_count ?? 0),
      openIssues: Number(r.open_issues_count ?? 0),
      pushedAt,
      archived: Boolean(r.archived),
    };
  } catch (err) {
    // One line per build is enough; the stats are optional.
    if (!warned) {
      warned = true;
      console.warn(`[github] stats unavailable, leaving them out (${repo}: ${(err as Error).message})`);
    }
    return null;
  }
}

export function repoStats(repo: string | undefined): Promise<RepoStats | null> {
  if (!repo) return Promise.resolve(null);
  let p = cache.get(repo);
  if (!p) {
    p = load(repo);
    cache.set(repo, p);
  }
  return p;
}

/** 1234 -> "1.2k", 118000 -> "118k" */
export function compact(n: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(n)
    .toLowerCase();
}
