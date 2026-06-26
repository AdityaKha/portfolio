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

interface HeatmapDay {
  date: Date;
  count: number;
  level: number;
  isFuture: boolean;
}

interface HeatmapWeek {
  label: string | null;
  days: HeatmapDay[];
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

const DAY_MS = 86_400_000;
const WEEKS_PER_MONTH = 4.345;
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function monthsForViewportWidth(width: number): number {
  if (width < 640) return 4;
  if (width < 768) return 6;
  if (width < 1024) return 9;
  return 12;
}

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
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

  return {
    profile,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
    weeks,
    totalContributions,
    activeDays,
    currentStreak,
    longestStreak,
  };
}

@Component({
  selector: 'app-github-heatmap',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="github-stats" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
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
          <p class="text-text-secondary">
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
            class="glass-strong rounded-2xl p-12 text-center text-text-muted"
            appFadeIn
          >
            Fetching live stats from GitHub&hellip;
          </div>

          <!-- Error -->
          <div
            *ngIf="state.status === 'error'"
            class="glass-strong rounded-2xl p-12 text-center"
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
                class="glass-strong rounded-2xl p-6 flex flex-col items-center text-center"
                appFadeIn
              >
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

              <!-- Stats cards -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

              <div class="flex flex-col gap-2">
                <div class="flex gap-[2px]">
                  <div
                    *ngFor="let week of state.vm.weeks; let i = index"
                    class="w-[12px] text-[10px] text-text-muted whitespace-nowrap"
                    [class.ml-2]="i > 0 && week.label"
                  >
                    {{ week.label }}
                  </div>
                </div>
                <div class="flex gap-[2px]">
                  <div
                    *ngFor="let week of state.vm.weeks; let i = index"
                    class="flex flex-col gap-[2px]"
                    [class.ml-2]="i > 0 && week.label"
                  >
                    <div
                      *ngFor="let day of week.days"
                      class="heatmap-cell !w-3 !h-3"
                      [class.invisible]="day.isFuture"
                      [ngClass]="'level-' + day.level"
                      [title]="getTooltip(day)"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Legend -->
              <div class="mt-6 flex items-center justify-end gap-3">
                <span class="text-xs text-text-muted font-semibold">Less</span>
                <div class="flex gap-1">
                  <div class="heatmap-legend-cell level-0"></div>
                  <div class="heatmap-legend-cell level-1"></div>
                  <div class="heatmap-legend-cell level-2"></div>
                  <div class="heatmap-legend-cell level-3"></div>
                  <div class="heatmap-legend-cell level-4"></div>
                </div>
                <span class="text-xs text-text-muted font-semibold">More</span>
              </div>
            </div>

            <!-- Streaks -->
            <div class="glass-strong rounded-2xl p-6 border border-white/10" appFadeIn>
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
export class GitHubHeatmapComponent {
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

  getTooltip(day: HeatmapDay): string {
    const dateLabel = day.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return `${dateLabel}: ${day.count} contribution${day.count === 1 ? '' : 's'}`;
  }
}
