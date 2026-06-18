import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface HeatmapDay {
  date: Date;
  count: number;
  level: number;
}

@Component({
  selector: 'app-github-heatmap',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
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
          <p class="text-text-secondary">Last year's activity heatmap — 342 contributions</p>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">342</div>
            <div class="text-xs text-text-muted font-medium">Total Contributions</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">128</div>
            <div class="text-xs text-text-muted font-medium">Commits</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">47</div>
            <div class="text-xs text-text-muted font-medium">PRs Merged</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">89</div>
            <div class="text-xs text-text-muted font-medium">Code Reviews</div>
          </div>
        </div>

        <!-- Heatmap -->
        <div class="glass-strong rounded-2xl p-6 mb-8">
          <h3 class="text-text-primary font-semibold mb-4">Activity Heatmap</h3>
          <div class="overflow-x-auto">
            <div class="heatmap-container min-w-max">
              <div
                *ngFor="let day of heatmapData"
                class="heatmap-cell"
                [ngClass]="'level-' + day.level"
                [title]="getTooltip(day)"
              ></div>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-8 flex items-center justify-end gap-3">
            <span class="text-xs text-text-muted font-semibold">Less</span>
            <div class="flex gap-2">
              <div class="heatmap-legend-cell level-0" title="No contribution"></div>
              <div class="heatmap-legend-cell level-1" title="1-2 contributions"></div>
              <div class="heatmap-legend-cell level-2" title="3-5 contributions"></div>
              <div class="heatmap-legend-cell level-3" title="6-8 contributions"></div>
              <div class="heatmap-legend-cell level-4" title="9+ contributions"></div>
            </div>
            <span class="text-xs text-text-muted font-semibold">More</span>
          </div>
        </div>

        <!-- Achievements -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-strong rounded-2xl p-6 border border-white/10">
            <h3 class="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">🔥</span> Streaks
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-text-secondary text-sm">Current streak</span>
                <span class="text-lg font-bold gradient-text">12 days</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-text-secondary text-sm">Longest streak</span>
                <span class="text-lg font-bold gradient-text">47 days</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-text-secondary text-sm">Total commits</span>
                <span class="text-lg font-bold gradient-text">1,284</span>
              </div>
            </div>
          </div>

          <div class="glass-strong rounded-2xl p-6 border border-white/10">
            <h3 class="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">⭐</span> Achievements
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">✨</span>
                <div>
                  <div class="text-text-primary text-sm font-medium">Code Contributor</div>
                  <div class="text-text-muted text-xs">100+ public repositories</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">🚀</span>
                <div>
                  <div class="text-text-primary text-sm font-medium">Active Developer</div>
                  <div class="text-text-muted text-xs">Consistent contributions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class GitHubHeatmapComponent implements OnInit {
  heatmapData: HeatmapDay[] = [];

  ngOnInit() {
    this.generateHeatmapData();
  }

  private generateHeatmapData() {
    const data: HeatmapDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayOfWeek = date.getDay();
      const count = this.generateContributionCount(i, dayOfWeek);
      const level = this.getLevel(count);

      data.push({ date, count, level });
    }

    this.heatmapData = data;
  }

  private generateContributionCount(dayOffset: number, dayOfWeek: number): number {
    const baseCount = Math.random() * 10;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return Math.floor(baseCount * 0.5);
    }

    if (dayOffset % 7 === 0) {
      return Math.floor(baseCount * 2);
    }

    return Math.floor(baseCount);
  }

  private getLevel(count: number): number {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 9) return 3;
    return 4;
  }

  getTooltip(day: HeatmapDay): string {
    return `${day.date.toLocaleDateString()}: ${day.count} contributions`;
  }
}
