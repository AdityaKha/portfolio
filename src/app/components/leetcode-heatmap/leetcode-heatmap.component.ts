import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface HeatmapDay {
  date: Date;
  count: number;
  level: number;
}

@Component({
  selector: 'app-leetcode-heatmap',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  template: `
    <section id="leetcode-stats" class="section-padding bg-gradient-dark">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Header -->
        <div class="mb-12" appFadeIn>
          <div class="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="text-text-primary">
              <path d="M16.102c0 .6-.3 1.2-.9 1.5l-9.6 5.4c-.6.3-1.2.3-1.8 0L.3 16.7c-.6-.3-.9-.9-.9-1.5V6.8c0-.6.3-1.2.9-1.5l9.6-5.4c.6-.3 1.2-.3 1.8 0l9.6 5.4c.6.3.9.9.9 1.5v8.4zm-1.2-7.2c0-.3-.15-.6-.45-.75l-4.8-2.7c-.3-.15-.6-.15-.9 0l-4.8 2.7c-.3.15-.45.45-.45.75v5.4c0 .3.15.6.45.75l4.8 2.7c.3.15.6.15.9 0l4.8-2.7c.3-.15.45-.45.45-.75v-5.4z" />
            </svg>
            <h2 class="text-4xl md:text-5xl font-bold text-text-primary">
              LeetCode Progress
            </h2>
          </div>
          <p class="text-text-secondary">Problem-solving consistency — 350+ problems solved</p>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">350</div>
            <div class="text-xs text-text-muted font-medium">Problems Solved</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">245</div>
            <div class="text-xs text-text-muted font-medium">Easy</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">95</div>
            <div class="text-xs text-text-muted font-medium">Medium</div>
          </div>
          <div class="glass rounded-xl p-4 text-center">
            <div class="text-2xl font-bold gradient-text mb-1">10</div>
            <div class="text-xs text-text-muted font-medium">Hard</div>
          </div>
        </div>

        <!-- Heatmap -->
        <div class="glass-strong rounded-2xl p-6 mb-8">
          <h3 class="text-text-primary font-semibold mb-4">Submission Activity (Last Year)</h3>
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
              <div class="heatmap-legend-cell level-0" title="No submission"></div>
              <div class="heatmap-legend-cell level-1" title="1 submission"></div>
              <div class="heatmap-legend-cell level-2" title="2-3 submissions"></div>
              <div class="heatmap-legend-cell level-3" title="4-5 submissions"></div>
              <div class="heatmap-legend-cell level-4" title="6+ submissions"></div>
            </div>
            <span class="text-xs text-text-muted font-semibold">More</span>
          </div>
        </div>

        <!-- Achievements -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-strong rounded-2xl p-6 border border-white/10">
            <h3 class="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">🎯</span> Badges & Milestones
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-lg">🥇</span>
                <span class="text-text-secondary text-sm">100+ Problems Solved</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🥈</span>
                <span class="text-text-secondary text-sm">250+ Problems Solved</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🥉</span>
                <span class="text-text-secondary text-sm">350+ Problems Solved</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">⭐</span>
                <span class="text-text-secondary text-sm">Consistent Contributor</span>
              </div>
            </div>
          </div>

          <div class="glass-strong rounded-2xl p-6 border border-white/10">
            <h3 class="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">📊</span> Problem Breakdown
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1.5">
                  <span class="text-text-secondary text-sm">Easy</span>
                  <span class="text-text-muted text-xs font-mono">70%</span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-400 to-emerald-500" style="width: 70%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1.5">
                  <span class="text-text-secondary text-sm">Medium</span>
                  <span class="text-text-muted text-xs font-mono">27%</span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style="width: 27%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1.5">
                  <span class="text-text-secondary text-sm">Hard</span>
                  <span class="text-text-muted text-xs font-mono">3%</span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-red-400 to-pink-500" style="width: 3%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top categories -->
        <div class="glass-strong rounded-2xl p-6 mt-6 border border-white/10">
          <h3 class="text-text-primary font-semibold mb-4">Top Problem Categories</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="glass rounded-lg p-3">
              <div class="text-text-secondary text-sm font-medium mb-1">Data Structures</div>
              <div class="flex items-baseline gap-2">
                <div class="text-2xl font-bold gradient-text">87</div>
                <div class="text-text-muted text-xs">problems</div>
              </div>
            </div>
            <div class="glass rounded-lg p-3">
              <div class="text-text-secondary text-sm font-medium mb-1">Dynamic Programming</div>
              <div class="flex items-baseline gap-2">
                <div class="text-2xl font-bold gradient-text">56</div>
                <div class="text-text-muted text-xs">problems</div>
              </div>
            </div>
            <div class="glass rounded-lg p-3">
              <div class="text-text-secondary text-sm font-medium mb-1">Algorithms</div>
              <div class="flex items-baseline gap-2">
                <div class="text-2xl font-bold gradient-text">73</div>
                <div class="text-text-muted text-xs">problems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LeetcodeHeatmapComponent implements OnInit {
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
      const count = this.generateSubmissionCount(i, dayOfWeek);
      const level = this.getLevel(count);

      data.push({ date, count, level });
    }

    this.heatmapData = data;
  }

  private generateSubmissionCount(dayOffset: number, dayOfWeek: number): number {
    const baseCount = Math.random() * 8;

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return Math.floor(baseCount * 1.5);
    }

    if (dayOffset % 14 === 0) {
      return Math.floor(baseCount * 2.5);
    }

    return Math.floor(baseCount);
  }

  private getLevel(count: number): number {
    if (count === 0) return 0;
    if (count < 2) return 1;
    if (count < 4) return 2;
    if (count < 6) return 3;
    return 4;
  }

  getTooltip(day: HeatmapDay): string {
    return `${day.date.toLocaleDateString()}: ${day.count} submissions`;
  }
}
