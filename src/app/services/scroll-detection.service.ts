import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export interface ScrollEvent {
  scrollY: number;
  progress: number;
}

@Injectable({ providedIn: 'root' })
export class ScrollDetectionService {
  private scrollSubject = new BehaviorSubject<ScrollEvent>({
    scrollY: 0,
    progress: 0,
  });

  public scroll$ = this.scrollSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.initScrollListener();
  }

  private initScrollListener() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(throttleTime(10))
        .subscribe(() => {
          this.ngZone.run(() => {
            const scrollY = window.scrollY;
            const progress = this.calculateScrollProgress();
            this.scrollSubject.next({ scrollY, progress });
          });
        });
    });
  }

  calculateScrollProgress(): number {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
  }

  observeElement(el: HTMLElement): Observable<boolean> {
    return new Observable(observer => {
      if (!IntersectionObserver) {
        observer.next(true);
        observer.complete();
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => observer.next(entry.isIntersecting),
        { threshold: 0.15 }
      );
      io.observe(el);

      return () => io.disconnect();
    });
  }

  getScrollProgress(): number {
    return this.scrollSubject.value.progress;
  }
}
