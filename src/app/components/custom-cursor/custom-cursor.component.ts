import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
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
    <div #glowOuterEl class="cursor-glow-outer hidden md:block"></div>
    <div #glowInnerEl class="cursor-glow-inner hidden md:block"></div>
    <div #dotEl class="cursor-dot hidden md:block"></div>
    <div #ringEl class="cursor-ring hidden md:block"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dotEl') dotEl!: ElementRef<HTMLDivElement>;
  @ViewChild('ringEl') ringEl!: ElementRef<HTMLDivElement>;
  @ViewChild('glowOuterEl') glowOuterEl!: ElementRef<HTMLDivElement>;
  @ViewChild('glowInnerEl') glowInnerEl!: ElementRef<HTMLDivElement>;

  private posRef = { x: -200, y: -200 };
  private ringPos = { x: -200, y: -200 };
  private glowOuterPos = { x: -200, y: -200 };
  private glowInnerPos = { x: -200, y: -200 };
  private rafRef?: number;
  private visible = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    this.ngZone.runOutsideAngular(() => {
      this.setupMouseTracking();
    });
  }

  private setupMouseTracking() {
    const dot = this.dotEl.nativeElement;
    const ring = this.ringEl.nativeElement;
    const glowOuter = this.glowOuterEl.nativeElement;
    const glowInner = this.glowInnerEl.nativeElement;

    const show = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      glowOuter.style.opacity = '1';
      glowInner.style.opacity = '1';
    };

    const hide = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      glowOuter.style.opacity = '0';
      glowInner.style.opacity = '0';
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

      glowInner.style.left = `${this.glowInnerPos.x}px`;
      glowInner.style.top = `${this.glowInnerPos.y}px`;
      this.glowInnerPos.x += (this.posRef.x - this.glowInnerPos.x) * 0.08;
      this.glowInnerPos.y += (this.posRef.y - this.glowInnerPos.y) * 0.08;

      glowOuter.style.left = `${this.glowOuterPos.x}px`;
      glowOuter.style.top = `${this.glowOuterPos.y}px`;
      this.glowOuterPos.x += (this.posRef.x - this.glowOuterPos.x) * 0.05;
      this.glowOuterPos.y += (this.posRef.y - this.glowOuterPos.y) * 0.05;

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
