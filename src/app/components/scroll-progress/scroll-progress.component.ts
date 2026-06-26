import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScrollDetectionService } from '../../services/scroll-detection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="scroll-progress"
      [style.width.%]="scrollProgress() * 100"
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
export class ScrollProgressComponent {
  private scrollDetection = inject(ScrollDetectionService);
  readonly scrollProgress = signal(0);

  constructor() {
    this.scrollDetection.scroll$
      .pipe(takeUntilDestroyed())
      .subscribe(scroll => this.scrollProgress.set(scroll.progress));
  }
}
