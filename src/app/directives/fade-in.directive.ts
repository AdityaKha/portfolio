import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ScrollDetectionService } from '../services/scroll-detection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective {
  @Input() appFadeIn: number | string | null = 0;

  private el = inject(ElementRef);
  private scrollDetection = inject(ScrollDetectionService);
  private animated = false;

  constructor() {
    this.scrollDetection
      .observeElement(this.el.nativeElement)
      .pipe(takeUntilDestroyed())
      .subscribe(isInView => {
        if (isInView && !this.animated) {
          this.animated = true;
          const element = this.el.nativeElement as HTMLElement;
          element.style.animation = `fadeInUp 0.6s ease-out ${this.appFadeIn}ms forwards`;
        }
      });
  }
}
