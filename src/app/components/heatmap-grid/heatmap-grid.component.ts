import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapDay, HeatmapWeek } from './heatmap-grid.types';

@Component({
  selector: 'app-heatmap-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class.overflow-x-auto]="scrollable">
      <div class="flex flex-col gap-2" [class.min-w-fit]="scrollable">
        <div class="flex gap-[2px]">
          <div
            *ngFor="let week of weeks; let i = index"
            class="w-[12px] text-[10px] text-text-muted whitespace-nowrap"
            [class.ml-2]="i > 0 && week.label"
          >
            {{ week.label }}
          </div>
        </div>
        <div class="flex gap-[2px]">
          <div
            *ngFor="let week of weeks; let i = index"
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
    </div>
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
  `,
})
export class HeatmapGridComponent {
  @Input({ required: true }) weeks!: HeatmapWeek[];
  @Input() tooltipLabel = 'contribution';
  @Input() scrollable = false;

  getTooltip(day: HeatmapDay): string {
    const dateLabel = day.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return `${dateLabel}: ${day.count} ${this.tooltipLabel}${day.count === 1 ? '' : 's'}`;
  }
}
