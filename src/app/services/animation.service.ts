import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  constructor(private ngZone: NgZone) {}

  animateValue(
    from: number,
    to: number,
    duration: number,
    onFrame: (value: number) => void
  ) {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * this.easeOutCubic(progress);
      onFrame(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      animate();
    });
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}
