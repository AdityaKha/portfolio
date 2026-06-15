import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #dotEl class="cursor-dot hidden md:block"></div>
    <div #ringEl class="cursor-ring hidden md:block"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('dotEl') dotEl!: ElementRef<HTMLDivElement>;
  @ViewChild('ringEl') ringEl!: ElementRef<HTMLDivElement>;

  private posRef = { x: -200, y: -200 };
  private ringPos = { x: -200, y: -200 };
  private rafRef?: number;
  private visible = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    this.ngZone.runOutsideAngular(() => {
      this.setupMouseTracking();
    });
  }

  private setupMouseTracking() {
    const dot = this.dotEl.nativeElement;
    const ring = this.ringEl.nativeElement;

    const show = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const hide = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMove = (e: MouseEvent) => {
      if (!this.visible) {
        this.visible = true;
        show();
      }
      this.posRef = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseDown = () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onMouseUp = () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const animate = () => {
      ring.style.left = `${this.ringPos.x}px`;
      ring.style.top = `${this.ringPos.y}px`;
      this.ringPos.x += (this.posRef.x - this.ringPos.x) * 0.12;
      this.ringPos.y += (this.posRef.y - this.ringPos.y) * 0.12;
      this.rafRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    this.ngZone.runOutsideAngular(() => {
      this.rafRef = requestAnimationFrame(animate);
    });
  }

  ngOnDestroy() {
    if (this.rafRef) {
      cancelAnimationFrame(this.rafRef);
    }
  }
}
