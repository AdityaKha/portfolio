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
  LeetcodeBadge,
  LeetcodeProfileInfo,
  LeetcodeStats,
  LeetcodeStatsService,
} from '../../services/leetcode-stats.service';
import { HeatmapGridComponent } from '../heatmap-grid/heatmap-grid.component';
import {
  DAY_MS,
  HeatmapDay,
  HeatmapWeek,
  MONTH_NAMES,
  WEEKS_PER_MONTH,
  monthsForViewportWidth,
} from '../heatmap-grid/heatmap-grid.types';

interface RingArc {
  dasharray: string;
  dashoffset: number;
}

interface StatRing {
  label: string;
  color: string;
  solved: number;
  percent: number;
  arc: RingArc;
}

interface MobileRingData {
  label: string;
  color: string;
  startAngle: number;
  dasharray: string;
  solved: number;
}

interface LeetcodeViewModel {
  ranking: number;
  totalSolved: number;
  rings: StatRing[];
  mobileRings: MobileRingData[];
  avatar: string | null;
  badges: LeetcodeBadge[];
  weeks: HeatmapWeek[];
  totalSubmissions: number;
  activeDays: number;
  maxStreak: number;
}

type LeetcodeState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; vm: LeetcodeViewModel };

interface RawLeetcodeData {
  stats: LeetcodeStats;
  profile: LeetcodeProfileInfo;
  badges: LeetcodeBadge[];
}

type RawState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; data: RawLeetcodeData };

const RING_RADIUS = 48;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 2) return 1;
  if (count < 4) return 2;
  if (count < 6) return 3;
  return 4;
}

function buildHeatmap(
  submissionCalendar: Record<string, number>,
  weeksToShow: number
): {
  weeks: HeatmapWeek[];
  totalSubmissions: number;
  activeDays: number;
  maxStreak: number;
} {
  const dayCounts = new Map<number, number>();
  for (const [epochSeconds, count] of Object.entries(submissionCalendar)) {
    dayCounts.set(Math.floor(Number(epochSeconds) / 86_400), count);
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
    const days: HeatmapDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayIndex = firstDayIndex + w * 7 + d;
      const date = new Date(dayIndex * DAY_MS);
      const isFuture = dayIndex > todayUtcDayIndex;
      const count = dayCounts.get(dayIndex) ?? 0;
      days.push({ date, count, level: isFuture ? 0 : getLevel(count), isFuture });
    }

    const firstDayMonth = days[0].date.getUTCMonth();
    const label = firstDayMonth !== lastMonth ? MONTH_NAMES[firstDayMonth] : null;
    lastMonth = firstDayMonth;

    weeks.push({ label, days });
  }

  const windowDayIndices = Array.from(dayCounts.keys())
    .filter((dayIndex) => dayIndex >= firstDayIndex && dayIndex <= todayUtcDayIndex)
    .sort((a, b) => a - b);

  let maxStreak = 0;
  let currentStreak = 0;
  let previousIndex: number | null = null;

  for (const dayIndex of windowDayIndices) {
    currentStreak = previousIndex === dayIndex - 1 ? currentStreak + 1 : 1;
    maxStreak = Math.max(maxStreak, currentStreak);
    previousIndex = dayIndex;
  }

  const totalSubmissions = windowDayIndices.reduce(
    (sum, dayIndex) => sum + (dayCounts.get(dayIndex) ?? 0),
    0
  );

  return { weeks, totalSubmissions, activeDays: windowDayIndices.length, maxStreak };
}

function buildRingArc(length: number): RingArc {
  return { dasharray: `${length} ${RING_CIRCUMFERENCE}`, dashoffset: 0 };
}

function buildMobileRings(stats: LeetcodeStats): MobileRingData[] {
  const RADIUS = 40;
  const CIRC = 2 * Math.PI * RADIUS;
  const total = stats.easySolved + stats.mediumSolved + stats.hardSolved;
  const defs = [
    { label: 'Easy',   color: '#00b8a3', solved: stats.easySolved },
    { label: 'Medium', color: '#ffc01e', solved: stats.mediumSolved },
    { label: 'Hard',   color: '#ef4444', solved: stats.hardSolved },
  ];
  let accumulated = 0;
  return defs.map(({ label, color, solved }) => {
    const dashLength = total > 0 ? (solved / total) * CIRC : 0;
    const startAngle = -90 + (accumulated / CIRC) * 360;
    accumulated += dashLength;
    return { label, color, startAngle, dasharray: `${dashLength} ${CIRC}`, solved };
  });
}

function buildRings(stats: LeetcodeStats): StatRing[] {
  return [
    { label: 'Total', color: '#3b3b43', solved: stats.totalSolved, total: stats.totalQuestions },
    { label: 'Easy', color: '#52525b', solved: stats.easySolved, total: stats.totalEasy },
    { label: 'Medium', color: '#a1a1aa', solved: stats.mediumSolved, total: stats.totalMedium },
    { label: 'Hard', color: '#e4e4e7', solved: stats.hardSolved, total: stats.totalHard },
  ].map(({ label, color, solved, total }) => {
    const percent = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
    return { label, color, solved, percent, arc: buildRingArc((percent / 100) * RING_CIRCUMFERENCE) };
  });
}

function buildViewModel(
  stats: LeetcodeStats,
  profile: LeetcodeProfileInfo,
  badges: LeetcodeBadge[],
  monthsToShow: number
): LeetcodeViewModel {
  const weeksToShow = Math.round(monthsToShow * WEEKS_PER_MONTH);
  const { weeks, totalSubmissions, activeDays, maxStreak } = buildHeatmap(
    stats.submissionCalendar,
    weeksToShow
  );

  return {
    ranking: stats.ranking,
    totalSolved: stats.totalSolved,
    rings: buildRings(stats),
    mobileRings: buildMobileRings(stats),
    avatar: profile.avatar,
    badges,
    weeks,
    totalSubmissions,
    activeDays,
    maxStreak,
  };
}

@Component({
  selector: 'app-leetcode-profile',
  standalone: true,
  imports: [CommonModule, FadeInDirective, HeatmapGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="leetcode-stats" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Header -->
        <div class="mb-12" appFadeIn>
          <div class="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="text-text-primary">
              <path d="M16.102c0 .6-.3 1.2-.9 1.5l-9.6 5.4c-.6.3-1.2.3-1.8 0L.3 16.7c-.6-.3-.9-.9-.9-1.5V6.8c0-.6.3-1.2.9-1.5l9.6-5.4c.6-.3 1.2-.3 1.8 0l9.6 5.4c.6.3.9.9.9 1.5v8.4zm-1.2-7.2c0-.3-.15-.6-.45-.75l-4.8-2.7c-.3-.15-.6-.15-.9 0l-4.8 2.7c-.3.15-.45.45-.45.75v5.4c0 .3.15.6.45.75l4.8 2.7c.3.15.6.15.9 0l4.8-2.7c.3-.15.45-.45.45-.75v-5.4z" />
            </svg>
            <h2 class="text-4xl md:text-5xl font-bold text-text-primary">LeetCode Profile</h2>
          </div>
        </div>

        <ng-container *ngIf="state$ | async as state">
          <!-- Loading -->
          <div
            *ngIf="state.status === 'loading'"
            class="glass-strong rounded-2xl p-12 text-center text-text-muted"
            appFadeIn
          >
            Fetching live stats from LeetCode&hellip;
          </div>

          <!-- Error -->
          <div
            *ngIf="state.status === 'error'"
            class="glass-strong rounded-2xl p-12 text-center"
            appFadeIn
          >
            <p class="text-text-secondary mb-4">Couldn't load live LeetCode stats right now.</p>
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
              <div class="glass-strong rounded-2xl p-6" appFadeIn>

                <!-- MOBILE: horizontal row — avatar | name/rank | concentric rings -->
                <div class="flex md:hidden items-center gap-3 mb-3">
                  <img
                    *ngIf="state.vm.avatar"
                    [src]="state.vm.avatar"
                    alt="{{ username }} avatar"
                    class="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-white/10"
                  />
                  <div
                    *ngIf="!state.vm.avatar"
                    class="w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  >
                    {{ initials }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-base font-semibold text-text-primary leading-tight">@{{ username }}</div>
                    <div class="text-xs text-text-muted mt-0.5">Rank {{ state.vm.ranking | number }}</div>
                  </div>
                  <!-- Single ring split into Easy / Medium / Hard segments -->
                  <div class="flex-shrink-0">
                    <svg width="90" height="90" viewBox="0 0 110 110">
                      <!-- Track -->
                      <circle cx="55" cy="55" r="40" fill="none" stroke="#1e1e1e" stroke-width="8"/>
                      <!-- Coloured arc segments, each rotated to its start position -->
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
                      <text x="55" y="60" text-anchor="middle" fill="#e4e4e7" style="font-size: 18px; font-weight: 700;">{{ state.vm.totalSolved }}</text>
                    </svg>
                  </div>
                </div>

                <!-- MOBILE: difficulty legend -->
                <div class="flex md:hidden items-center justify-center gap-4 text-xs mb-3">
                  <span *ngFor="let mr of state.vm.mobileRings" class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full inline-block" [style.background-color]="mr.color"></span>
                    <span class="text-text-secondary">{{ mr.solved }} {{ mr.label }}</span>
                  </span>
                </div>

                <!-- MOBILE: badges -->
                <div *ngIf="state.vm.badges.length" class="flex md:hidden flex-wrap items-center justify-center gap-2 mb-3">
                  <img
                    *ngFor="let badge of state.vm.badges"
                    [src]="badge.icon"
                    [alt]="badge.displayName"
                    [title]="badge.displayName"
                    class="w-8 h-8 object-contain"
                  />
                </div>

                <!-- DESKTOP: centered column (unchanged) -->
                <div class="hidden md:flex flex-col items-center text-center">
                  <img
                    *ngIf="state.vm.avatar"
                    [src]="state.vm.avatar"
                    alt="{{ username }} avatar"
                    class="w-20 h-20 rounded-full object-cover mb-4 border border-white/10"
                  />
                  <div
                    *ngIf="!state.vm.avatar"
                    class="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-2xl font-bold text-white mb-4"
                  >
                    {{ initials }}
                  </div>
                  <div class="text-lg font-semibold text-text-primary">{{ username }}</div>
                  <div class="text-sm text-text-muted mb-4">Rank {{ state.vm.ranking | number }}</div>
                </div>

                <a
                  [href]="profileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline text-sm w-full text-center block"
                  >View on LeetCode</a
                >
              </div>

              <!-- Difficulty rings — desktop only -->
              <div class="hidden md:block glass-strong rounded-2xl p-6" appFadeIn>
                <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div class="text-sm text-text-muted">
                    <span class="text-text-primary font-semibold">{{ state.vm.totalSolved }}</span>
                    questions solved
                  </div>
                  <div *ngIf="state.vm.badges.length" class="flex items-center gap-3">
                    <img
                      *ngFor="let badge of state.vm.badges"
                      [src]="badge.icon"
                      [alt]="badge.displayName"
                      [title]="badge.displayName"
                      class="w-9 h-9 object-contain"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div *ngFor="let ring of state.vm.rings" class="flex flex-col items-center">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#262626" stroke-width="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        [attr.stroke]="ring.color"
                        stroke-width="10"
                        stroke-linecap="round"
                        transform="rotate(-90 60 60)"
                        [attr.stroke-dasharray]="ring.arc.dasharray"
                        [attr.stroke-dashoffset]="ring.arc.dashoffset"
                      />
                      <text x="60" y="65" text-anchor="middle" class="fill-current text-text-primary" style="font-size: 24px; font-weight: 700;">
                        {{ ring.solved }}
                      </text>
                    </svg>
                    <span class="text-sm font-medium mt-1" [style.color]="ring.color">{{ ring.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Heatmap -->
            <div class="glass-strong rounded-2xl p-6" appFadeIn>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 class="text-text-primary font-semibold">
                  {{ state.vm.totalSubmissions }} submissions
                </h3>
                <div class="flex items-center gap-4 text-sm text-text-muted">
                  <span>Total active days: <strong class="text-text-primary">{{ state.vm.activeDays }}</strong></span>
                  <span>Max streak: <strong class="text-text-primary">{{ state.vm.maxStreak }}</strong></span>
                </div>
              </div>

              <app-heatmap-grid [weeks]="state.vm.weeks" tooltipLabel="submission" />
            </div>
          </ng-container>
        </ng-container>
      </div>
    </section>
  `,
})
export class LeetcodeProfileComponent {
  readonly username = 'adityakha';
  readonly profileUrl = `https://leetcode.com/u/${this.username}`;
  readonly initials = this.username.slice(0, 2).toUpperCase();

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
        stats: this.leetcodeStats.getStats(this.username),
        profile: this.leetcodeStats
          .getProfile(this.username)
          .pipe(catchError(() => of<LeetcodeProfileInfo>({ avatar: null }))),
        badges: this.leetcodeStats
          .getBadges(this.username)
          .pipe(catchError(() => of<LeetcodeBadge[]>([]))),
      }).pipe(
        map((data): RawState => ({ status: 'success', data })),
        startWith<RawState>({ status: 'loading' }),
        catchError(() => of<RawState>({ status: 'error' }))
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly state$: Observable<LeetcodeState> = combineLatest([
    this.rawData$,
    this.monthsToShow$,
  ]).pipe(
    map(([raw, months]): LeetcodeState => {
      if (raw.status !== 'success') return raw;
      return {
        status: 'success',
        vm: buildViewModel(raw.data.stats, raw.data.profile, raw.data.badges, months),
      };
    })
  );

  private leetcodeStats = inject(LeetcodeStatsService);

  retry(): void {
    this.refresh$.next();
  }
}
