import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GithubRepoSummary {
  stars: number;
  forks: number;
  language: string | null;
}

export interface GithubContributions {
  totalContributions: number;
  days: { date: string; count: number }[];
}

interface RawGithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface RawGithubRepo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface RawGithubContributions {
  total: Record<string, number>;
  contributions: { date: string; count: number }[];
}

// The REST API at api.github.com allows CORS for unauthenticated GET requests, so it
// can be called directly from the browser. Contribution calendars are GraphQL-only and
// require auth, so we use a community proxy that re-exposes them as JSON.
const API_BASE = 'https://api.github.com';
const CONTRIBUTIONS_API_BASE = 'https://github-contributions-api.jogruber.de/v4';

@Injectable({ providedIn: 'root' })
export class GithubStatsService {
  private http = inject(HttpClient);

  getProfile(username: string): Observable<GithubProfile> {
    return this.http.get<RawGithubProfile>(`${API_BASE}/users/${username}`).pipe(
      map((res) => ({
        login: res.login,
        name: res.name,
        bio: res.bio,
        avatarUrl: res.avatar_url,
        htmlUrl: res.html_url,
        publicRepos: res.public_repos,
        followers: res.followers,
        following: res.following,
      }))
    );
  }

  getRepoSummaries(username: string): Observable<GithubRepoSummary[]> {
    return this.http
      .get<RawGithubRepo[]>(`${API_BASE}/users/${username}/repos?per_page=100&type=owner`)
      .pipe(
        map((repos) =>
          repos.map((repo) => ({
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
          }))
        )
      );
  }

  getContributions(username: string): Observable<GithubContributions> {
    return this.http
      .get<RawGithubContributions>(`${CONTRIBUTIONS_API_BASE}/${username}?y=last`)
      .pipe(
        map((res) => ({
          totalContributions: Object.values(res.total).reduce((sum, n) => sum + n, 0),
          days: res.contributions.map((c) => ({ date: c.date, count: c.count })),
        }))
      );
  }
}
