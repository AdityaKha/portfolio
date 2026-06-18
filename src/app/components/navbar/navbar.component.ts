import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      [@navEnter]
      [ngClass]="{ 'py-3': scrolled, 'py-5': !scrolled }"
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    >
      <div
        [ngClass]="{
          'glass-strong py-3 shadow-lg': scrolled,
          'py-0': !scrolled,
        }"
        class="mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300"
      >
        <!-- Logo -->
        <button
          (click)="scrollToTop()"
          class="flex items-center gap-2 group"
        >
          <span
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm select-none"
          >
            AK
          </span>
          <span
            class="text-text-primary font-semibold text-sm hidden sm:block group-hover:text-accent-blue transition-colors"
          >
            Aditya Khandelwal
          </span>
        </button>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-1">
          <li *ngFor="let link of links">
            <button
              (click)="handleNav(link.href)"
              [ngClass]="{
                'text-accent-blue bg-accent-blue/10': active === link.href,
                'text-text-secondary hover:text-text-primary hover:bg-white/5':
                  active !== link.href,
              }"
              class="px-3 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-3">
          <a
            href="mailto:khandelwal.aditya5@gmail.com"
            class="btn-primary text-sm py-2 px-4"
          >
            <span>Hire Me</span>
          </a>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
          (click)="open = !open"
          [attr.aria-label]="open ? 'Close menu' : 'Open menu'"
        >
          <svg *ngIf="!open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg *ngIf="open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      *ngIf="open"
      [@mobileMenuAnimation]
      class="fixed inset-x-0 top-20 z-40 mx-4 glass rounded-2xl p-4 md:hidden shadow-2xl"
    >
      <ul class="flex flex-col gap-1">
        <li *ngFor="let link of links">
          <button
            (click)="handleNav(link.href)"
            class="w-full text-left px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-xl transition-all font-medium"
          >
            {{ link.label }}
          </button>
        </li>
        <li class="pt-2 border-t border-white/5">
          <a
            href="mailto:khandelwal.aditya5@gmail.com"
            class="block w-full text-center btn-primary text-sm py-2.5"
            (click)="open = false"
          >
            <span>Hire Me</span>
          </a>
        </li>
      </ul>
    </div>
  `,
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
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  open = false;
  active = '';
  private destroy$ = new Subject<void>();

  readonly links = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'GitHub', href: '#github-stats' },
    { label: 'LeetCode', href: '#leetcode-stats' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(private scrollDetection: ScrollDetectionService) {}

  ngOnInit() {
    this.scrollDetection.scroll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(scroll => {
        this.scrolled = scroll.scrollY > 40;
      });
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
  }
}
