import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, forkJoin, fromEvent, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FadeInDirective } from '../../directives/fade-in.directive';
import {
  GithubContributions,
  GithubProfile,
  GithubRepoSummary,
  GithubStatsService,
} from '../../services/github-stats.service';
import { HeatmapGridComponent } from '../heatmap-grid/heatmap-grid.component';
import {
  DAY_MS,
  HeatmapDay,
  HeatmapWeek,
  MONTH_NAMES,
  WEEKS_PER_MONTH,
  monthsForViewportWidth,
} from '../heatmap-grid/heatmap-grid.types';

interface MobileGithubRingData {
  label: string;
  color: string;
  startAngle: number;
  dasharray: string;
  value: number;
}

interface GithubViewModel {
  profile: GithubProfile;
  totalStars: number;
  totalForks: number;
  weeks: HeatmapWeek[];
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  mobileRings: MobileGithubRingData[];
}

type GithubState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; vm: GithubViewModel };

interface RawGithubData {
  profile: GithubProfile;
  repos: GithubRepoSummary[];
  contributions: GithubContributions;
}

type RawState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; data: RawGithubData };

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 1) return 1;
  if (count < 2) return 2;
  if (count < 3) return 3;
  return 4;
}

function buildHeatmap(
  days: { date: string; count: number }[],
  weeksToShow: number
): {
  weeks: HeatmapWeek[];
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
} {
  const dayCounts = new Map<number, number>();
  for (const { date, count } of days) {
    dayCounts.set(Math.floor(new Date(`${date}T00:00:00Z`).getTime() / DAY_MS), count);
  }

  const today = new Date();
  const todayUtcDayIndex = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / DAY_MS
  );
  const daysUntilSaturday = 6 - today.getDay();
  const lastDayIndex = todayUtcDayIndex + daysUntilSaturday;
  const firstDayIndex = lastDayIndex - (weeksToShow * 7 - 1);

  const weeks: HeatmapWeek[] = [];
  let lastMonth = -1;

  for (let w = 0; w < weeksToShow; w++) {
    const weekDays: HeatmapDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayIndex = firstDayIndex + w * 7 + d;
      const date = new Date(dayIndex * DAY_MS);
      const isFuture = dayIndex > todayUtcDayIndex;
      const count = dayCounts.get(dayIndex) ?? 0;
      weekDays.push({ date, count, level: isFuture ? 0 : getLevel(count), isFuture });
    }

    const firstDayMonth = weekDays[0].date.getUTCMonth();
    const label = firstDayMonth !== lastMonth ? MONTH_NAMES[firstDayMonth] : null;
    lastMonth = firstDayMonth;

    weeks.push({ label, days: weekDays });
  }

  const windowDayIndices = Array.from(dayCounts.keys())
    .filter((dayIndex) => dayIndex >= firstDayIndex && dayIndex <= todayUtcDayIndex)
    .sort((a, b) => a - b);

  let longestStreak = 0;
  let streak = 0;
  let previousIndex: number | null = null;

  for (const dayIndex of windowDayIndices) {
    if ((dayCounts.get(dayIndex) ?? 0) === 0) {
      streak = 0;
      previousIndex = dayIndex;
      continue;
    }
    streak = previousIndex === dayIndex - 1 ? streak + 1 : 1;
    longestStreak = Math.max(longestStreak, streak);
    previousIndex = dayIndex;
  }

  let currentStreak = 0;
  for (let dayIndex = todayUtcDayIndex; dayCounts.get(dayIndex); dayIndex--) {
    currentStreak++;
  }

  const totalContributions = windowDayIndices.reduce(
    (sum, dayIndex) => sum + (dayCounts.get(dayIndex) ?? 0),
    0
  );

  return {
    weeks,
    totalContributions,
    activeDays: windowDayIndices.filter((dayIndex) => (dayCounts.get(dayIndex) ?? 0) > 0).length,
    currentStreak,
    longestStreak,
  };
}

function buildMobileGithubRings(
  totalContributions: number,
  publicRepos: number,
  totalStars: number
): MobileGithubRingData[] {
  const RADIUS = 40;
  const CIRC = 2 * Math.PI * RADIUS;
  const total = totalContributions + publicRepos + totalStars;
  const defs = [
    { label: 'Contributions', color: '#3b82f6', value: totalContributions },
    { label: 'Repos',         color: '#8b5cf6', value: publicRepos },
    { label: 'Stars',         color: '#f59e0b', value: totalStars },
  ];
  let accumulated = 0;
  return defs.map(({ label, color, value }) => {
    const dashLength = total > 0 ? (value / total) * CIRC : 0;
    const startAngle = -90 + (accumulated / CIRC) * 360;
    accumulated += dashLength;
    return { label, color, startAngle, dasharray: `${dashLength} ${CIRC}`, value };
  });
}

function buildViewModel(
  profile: GithubProfile,
  repos: GithubRepoSummary[],
  contributions: GithubContributions,
  monthsToShow: number
): GithubViewModel {
  const weeksToShow = Math.round(monthsToShow * WEEKS_PER_MONTH);
  const { weeks, totalContributions, activeDays, currentStreak, longestStreak } = buildHeatmap(
    contributions.days,
    weeksToShow
  );

  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);

  return {
    profile,
    totalStars,
    totalForks,
    weeks,
    totalContributions,
    activeDays,
    currentStreak,
    longestStreak,
    mobileRings: buildMobileGithubRings(totalContributions, profile.publicRepos, totalStars),
  };
}

@Component({
  selector: 'app-github-profile',
  standalone: true,
  imports: [CommonModule, FadeInDirective, HeatmapGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="github-stats" class="section-padding">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- Header -->
        <div class="mb-12" appFadeIn>
          <div class="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="text-text-primary">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <h2 class="text-4xl md:text-5xl font-bold text-text-primary">
              GitHub Contributions
            </h2>
          </div>
          <p class="hidden md:block text-text-secondary">
            Live stats from
            <a
              [href]="profileUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-accent-blue hover:underline"
              >&#64;{{ username }}</a
            >
          </p>
        </div>

        <ng-container *ngIf="state$ | async as state">
          <!-- Loading -->
          <div
            *ngIf="state.status === 'loading'"
            class="glass-strong rounded-2xl p-8 sm:p-12 text-center text-text-muted"
            appFadeIn
          >
            Fetching live stats from GitHub&hellip;
          </div>

          <!-- Error -->
          <div
            *ngIf="state.status === 'error'"
            class="glass-strong rounded-2xl p-8 sm:p-12 text-center"
            appFadeIn
          >
            <p class="text-text-secondary mb-4">Couldn't load live GitHub stats right now.</p>
            <div class="flex items-center justify-center gap-3">
              <button (click)="retry()" class="btn-primary"><span>Retry</span></button>
              <a [href]="profileUrl" target="_blank" rel="noopener noreferrer" class="btn-outline"
                >View Profile</a
              >
            </div>
          </div>

          <!-- Success -->
          <ng-container *ngIf="state.status === 'success'">
            <div class="grid md:grid-cols-[280px_1fr] gap-6 mb-6">
              <!-- Profile card -->
              <div
                class="glass-strong rounded-2xl p-6"
                appFadeIn
              >
                <!-- MOBILE: horizontal row — avatar+username | ring -->
                <div class="flex md:hidden items-center gap-3 mb-3">
                  <div class="flex flex-col items-center flex-shrink-0">
                    <img
                      [src]="state.vm.profile.avatarUrl"
                      alt="{{ username }} avatar"
                      class="w-14 h-14 rounded-full object-cover border border-white/10"
                    />
                    <span class="text-xs text-text-muted mt-1">&#64;{{ username }}</span>
                  </div>
                  <div class="flex-1 min-w-0"></div>
                  <div class="flex-shrink-0">
                    <svg width="90" height="90" viewBox="0 0 110 110">
                      <circle cx="55" cy="55" r="40" fill="none" stroke="#1e1e1e" stroke-width="8"/>
                      <circle
                        *ngFor="let mr of state.vm.mobileRings"
                        cx="55" cy="55" r="40" fill="none"
                        [attr.stroke]="mr.color"
                        stroke-width="8"
                        stroke-linecap="butt"
                        [attr.transform]="'rotate(' + mr.startAngle + ' 55 55)'"
                        [attr.stroke-dasharray]="mr.dasharray"
                        stroke-dashoffset="0"
                      />
                      <text x="55" y="60" text-anchor="middle" fill="#e4e4e7" style="font-size: 13px; font-weight: 700;">{{ state.vm.totalContributions }}</text>
                    </svg>
                  </div>
                </div>

                <!-- MOBILE: stat legend (no followers) -->
                <div class="flex md:hidden flex-wrap items-center justify-center gap-3 text-xs mb-3">
                  <span *ngFor="let mr of state.vm.mobileRings" class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full inline-block" [style.background-color]="mr.color"></span>
                    <span class="text-text-secondary">{{ mr.value }} {{ mr.label }}</span>
                  </span>
                </div>

                <!-- MOBILE: streaks -->
                <div class="md:hidden space-y-2 text-sm mb-3 border-t border-white/10 pt-3">
                  <div class="flex justify-between items-center">
                    <span class="text-text-secondary">Current streak</span>
                    <span class="font-bold gradient-text">{{ state.vm.currentStreak }} days</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-text-secondary">Longest streak</span>
                    <span class="font-bold gradient-text">{{ state.vm.longestStreak }} days</span>
                  </div>
                </div>

                <!-- MOBILE: button -->
                <a
                  [href]="profileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="md:hidden btn-outline text-sm w-full text-center block"
                  >View on GitHub</a
                >

                <!-- DESKTOP: centered column -->
                <div class="hidden md:flex flex-col items-center text-center">
                  <img
                    [src]="state.vm.profile.avatarUrl"
                    alt="{{ username }} avatar"
                    class="w-20 h-20 rounded-full object-cover mb-4 border border-white/10"
                  />
                  <div class="text-lg font-semibold text-text-primary">
                    {{ state.vm.profile.name || state.vm.profile.login }}
                  </div>
                  <p *ngIf="state.vm.profile.bio" class="text-sm text-text-muted mt-1 mb-4">
                    {{ state.vm.profile.bio }}
                  </p>
                  <a
                    [href]="profileUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-outline text-sm w-full text-center"
                    >View on GitHub</a
                  >
                </div>
              </div>

              <!-- Stats cards -->
              <div class="hidden md:grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="glass rounded-xl p-4 text-center flex flex-col justify-center">
                  <div class="text-2xl font-bold gradient-text mb-1">
                    {{ state.vm.totalContributions | number }}
                  </div>
                  <div class="text-xs text-text-muted font-medium">Contributions</div>
                </div>
                <div class="glass rounded-xl p-4 text-center flex flex-col justify-center">
                  <div class="text-2xl font-bold gradient-text mb-1">
                    {{ state.vm.profile.publicRepos | number }}
                  </div>
                  <div class="text-xs text-text-muted font-medium">Public Repos</div>
                </div>
                <div class="glass rounded-xl p-4 text-center flex flex-col justify-center">
                  <div class="text-2xl font-bold gradient-text mb-1">
                    {{ state.vm.totalStars | number }}
                  </div>
                  <div class="text-xs text-text-muted font-medium">Stars Earned</div>
                </div>
                <div class="glass rounded-xl p-4 text-center flex flex-col justify-center">
                  <div class="text-2xl font-bold gradient-text mb-1">
                    {{ state.vm.profile.followers | number }}
                  </div>
                  <div class="text-xs text-text-muted font-medium">Followers</div>
                </div>
              </div>
            </div>

            <!-- Heatmap -->
            <div class="glass-strong rounded-2xl p-6 mb-8" appFadeIn>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 class="text-text-primary font-semibold">
                  {{ state.vm.totalContributions | number }} contributions
                </h3>
                <div class="flex items-center gap-4 text-sm text-text-muted">
                  <span>Active days: <strong class="text-text-primary">{{ state.vm.activeDays }}</strong></span>
                  <span>Longest streak: <strong class="text-text-primary">{{ state.vm.longestStreak }}</strong></span>
                </div>
              </div>
              <app-heatmap-grid [weeks]="state.vm.weeks" tooltipLabel="contribution" [scrollable]="true" />
            </div>

            <!-- Streaks -->
            <div class="hidden md:block glass-strong rounded-2xl p-6 border border-white/10" appFadeIn>
              <h3 class="text-text-primary font-semibold mb-4 flex items-center gap-2">
                <span class="text-xl">🔥</span> Streaks
              </h3>
              <div class="grid sm:grid-cols-3 gap-3">
                <div class="flex justify-between items-center">
                  <span class="text-text-secondary text-sm">Current streak</span>
                  <span class="text-lg font-bold gradient-text">{{ state.vm.currentStreak }} days</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-secondary text-sm">Longest streak</span>
                  <span class="text-lg font-bold gradient-text">{{ state.vm.longestStreak }} days</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-secondary text-sm">Forks earned</span>
                  <span class="text-lg font-bold gradient-text">{{ state.vm.totalForks }}</span>
                </div>
              </div>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </section>
  `,
})
export class GitHubProfileComponent {
  readonly username = 'AdityaKha';
  readonly profileUrl = `https://github.com/${this.username}`;

  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  private readonly monthsToShow$: Observable<number> =
    typeof window === 'undefined'
      ? of(12)
      : fromEvent(window, 'resize').pipe(
          debounceTime(200),
          map(() => monthsForViewportWidth(window.innerWidth)),
          startWith(monthsForViewportWidth(window.innerWidth))
        );

  private readonly rawData$: Observable<RawState> = this.refresh$.pipe(
    switchMap(() =>
      forkJoin({
        profile: this.githubStats.getProfile(this.username),
        repos: this.githubStats
          .getRepoSummaries(this.username)
          .pipe(catchError(() => of<GithubRepoSummary[]>([]))),
        contributions: this.githubStats.getContributions(this.username),
      }).pipe(
        map((data): RawState => ({ status: 'success', data })),
        startWith<RawState>({ status: 'loading' }),
        catchError(() => of<RawState>({ status: 'error' }))
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly state$: Observable<GithubState> = combineLatest([
    this.rawData$,
    this.monthsToShow$,
  ]).pipe(
    map(([raw, months]): GithubState => {
      if (raw.status !== 'success') return raw;
      return {
        status: 'success',
        vm: buildViewModel(raw.data.profile, raw.data.repos, raw.data.contributions, months),
      };
    })
  );

  private githubStats = inject(GithubStatsService);

  retry(): void {
    this.refresh$.next();
  }
}
