import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { ScrollDetectionService } from '../../services/scroll-detection.service';
import { LiquidGlassService } from '../../services/liquid-glass.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const LIQUID_GLASS_FILTER_ID = 'liquid-glass-distortion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('navEnter', [
      transition(':enter', [
        style({ transform: 'translateY(-80px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navGlass') navGlassRef?: ElementRef<HTMLElement>;
  @ViewChild('liquidGlassDefs') liquidGlassDefsRef?: ElementRef<SVGDefsElement>;

  scrolled = false;
  open = false;
  active = '';
  private destroy$ = new Subject<void>();
  private resizeObserver?: ResizeObserver;
  private resizeDebounce?: ReturnType<typeof setTimeout>;

  readonly links = [
    { label: 'LeetCode', href: '#leetcode-stats' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'GitHub', href: '#github-stats' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(
    private scrollDetection: ScrollDetectionService,
    private liquidGlass: LiquidGlassService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.scrollDetection.scroll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(scroll => {
        this.scrolled = scroll.scrollY > 40;
      });
  }

  ngAfterViewInit() {
    if (!this.isLiquidGlassSupported()) return;

    this.zone.runOutsideAngular(() => {
      this.updateLiquidGlassFilter();

      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(this.resizeDebounce);
        this.resizeDebounce = setTimeout(() => this.updateLiquidGlassFilter(), 150);
      });
      if (this.navGlassRef) {
        this.resizeObserver.observe(this.navGlassRef.nativeElement);
      }
    });
  }

  // Chromium engines render backdrop-filter SVG references (used for the
  // refraction effect); Firefox/Safari ignore them, so they get the plain
  // blur fallback defined in navbar.component.scss instead.
  private isLiquidGlassSupported(): boolean {
    return (
      !!(window as any).chrome || /Chrome|Chromium|Edg\//.test(navigator.userAgent)
    );
  }

  private updateLiquidGlassFilter() {
    const navEl = this.navGlassRef?.nativeElement;
    const defs = this.liquidGlassDefsRef?.nativeElement;
    if (!navEl || !defs) return;

    const { width, height } = navEl.getBoundingClientRect();
    if (width === 0 || height === 0) {
      requestAnimationFrame(() => this.updateLiquidGlassFilter());
      return;
    }

    this.liquidGlass.buildFilter(defs, LIQUID_GLASS_FILTER_ID, width, height);
    navEl.style.backdropFilter = `url(#${LIQUID_GLASS_FILTER_ID})`;
    (navEl.style as any).webkitBackdropFilter = `url(#${LIQUID_GLASS_FILTER_ID})`;
  }

  handleNav(href: string) {
    this.open = false;
    this.active = href;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.resizeObserver?.disconnect();
    clearTimeout(this.resizeDebounce);
  }
}
