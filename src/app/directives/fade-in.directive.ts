import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ScrollDetectionService } from '../services/scroll-detection.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit, OnDestroy {
  @Input() appFadeIn = 0; // delay in ms
  private destroy$ = new Subject<void>();
  private animated = false;

  constructor(
    private el: ElementRef,
    private scrollDetection: ScrollDetectionService
  ) {}

  ngOnInit() {
    const element = this.el.nativeElement as HTMLElement;

    this.scrollDetection
      .observeElement(element)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isInView => {
        if (isInView && !this.animated) {
          this.animated = true;
          this.animateElement();
        }
      });
  }

  private animateElement() {
    const element = this.el.nativeElement as HTMLElement;
    const delay = this.appFadeIn;
    element.style.animation = `fadeInUp 0.6s ease-out ${delay}ms forwards`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
