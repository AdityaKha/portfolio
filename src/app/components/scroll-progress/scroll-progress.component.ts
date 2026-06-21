import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDetectionService } from '../../services/scroll-detection.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="scroll-progress"
      [style.width.%]="scrollProgress * 100"
    ></div>
  `,
  styles: [`
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: #3b3b43;
      z-index: 9999;
      transition: width 100ms ease-out;
    }
  `],
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress = 0;
  private destroy$ = new Subject<void>();

  constructor(private scrollDetection: ScrollDetectionService) {}

  ngOnInit() {
    this.scrollDetection.scroll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(scroll => {
        this.scrollProgress = scroll.progress;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
