import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LeetcodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  submissionCalendar: Record<string, number>;
}

export interface LeetcodeProfileInfo {
  avatar: string | null;
}

export interface LeetcodeBadge {
  id: string;
  displayName: string;
  icon: string;
}

// Browsers can't call https://leetcode.com/graphql directly (no CORS allow-origin
// for arbitrary hosts). These proxies call it server-side and re-expose it as JSON.
const STATS_API_BASE = 'https://leetcode-api-faisalshohag.vercel.app';
const PROFILE_API_BASE = 'https://alfa-leetcode-api.onrender.com';

@Injectable({ providedIn: 'root' })
export class LeetcodeStatsService {
  constructor(private http: HttpClient) {}

  getStats(username: string): Observable<LeetcodeStats> {
    return this.http.get<LeetcodeStats>(`${STATS_API_BASE}/${username}`);
  }

  getProfile(username: string): Observable<LeetcodeProfileInfo> {
    return this.http
      .get<{ avatar?: string }>(`${PROFILE_API_BASE}/${username}`)
      .pipe(map((res) => ({ avatar: res.avatar || null })));
  }

  getBadges(username: string): Observable<LeetcodeBadge[]> {
    return this.http
      .get<{ badges?: LeetcodeBadge[] }>(`${PROFILE_API_BASE}/${username}/badges`)
      .pipe(map((res) => res.badges ?? []));
  }
}
