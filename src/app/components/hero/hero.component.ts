import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  style,
} from '@angular/animations';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '400+', label: 'LeetCode Problems' },
  { value: '10K+', label: 'Users Impacted' },
  { value: '30%', label: 'Bug Reduction' },
];

const floatingBadges = [
  { label: 'Java 17+', delay: 0 },
  { label: 'HLD', delay: 2.4 },
  { label: 'Angular', delay: 0.8 },
  { label: 'Kafka', delay: 1.2 },
  { label: 'DSA', delay: 2.8 },
  { label: 'PostgreSQL', delay: 1.6 },
  { label: 'LLD', delay: 2.0 },
  { label: 'Spring Boot', delay: 0.4 },
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">
      <!-- Particle canvas -->
      <canvas #particleCanvas class="absolute inset-0 w-full h-full pointer-events-none opacity-60"></canvas>

      <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <!-- Full-width name banner -->
        <div
          [@fadeInUp]="{ value: 'visible', params: { delay: 150 } }"
          class="text-center mb-12"
        >
          <h1 class="w-full text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-text-primary leading-[1.05] tracking-tight">
            Aditya Khandelwal
          </h1>
          <h1 class="w-full text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black gradient-text leading-[1.05] tracking-tight">
            Portfolio
          </h1>
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Left content -->
          <div class="flex-1 text-center lg:text-left max-w-2xl">
            <!-- Status badge -->
            <div
              [@fadeInUp]="{ value: 'visible', params: { delay: 100 } }"
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-zinc-300 animate-pulse"></span>
              <span class="text-xs text-text-secondary font-medium">
                Available for new opportunities
              </span>
            </div>

            <!-- Role -->
            <div
              [@fadeInUp]="{ value: 'visible', params: { delay: 400 } }"
              class="text-xl sm:text-2xl font-semibold text-text-secondary mb-6"
            >
              Senior Software Engineer
            </div>

            <!-- Summary -->
            <p
              [@fadeInUp]="{ value: 'visible', params: { delay: 550 } }"
              class="text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Crafting reliable, high-performance products with
              <span class="text-accent-blue font-medium">Java, Spring Boot</span>,
              <span class="text-accent-blue font-medium">Angular</span>, and
              <span class="text-accent-blue font-medium">Microservices</span>.
            </p>

            <!-- CTA buttons -->
            <div
              [@fadeInUp]="{ value: 'visible', params: { delay: 700 } }"
              class="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <a href="#projects" class="btn-primary text-sm py-3 px-6">
                <span class="flex items-center gap-2">View My Work</span>
              </a>
              <a href="#contact" class="btn-outline text-sm py-3 px-6">
                Get In Touch
              </a>
            </div>

            <!-- Social links -->
            <div
              [@fadeInUp]="{ value: 'visible', params: { delay: 850 } }"
              class="flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://github.com/AdityaKha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/aditya-kha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://leetcode.com/u/adityakha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                class="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 12h8m-8 4h16m-12-8h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </a>
              <span class="text-text-muted text-xs font-mono ml-1" [attr.data-at]="'@'">AdityaKha</span>
            </div>
          </div>

          <!-- Profile photo with floating tech badges -->
          <div
            [@fadeInUp]="{ value: 'visible', params: { delay: 300 } }"
            class="relative w-[280px] h-[280px] sm:w-[376px] sm:h-[376px] flex-shrink-0 hidden md:block"
          >
            <div
              *ngFor="let badge of floatingBadges; let i = index"
              class="absolute glass px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary border border-white/10 animate-float whitespace-nowrap"
              [style.left.px]="calcBadgeX(i)"
              [style.top.px]="calcBadgeY(i)"
              [style.animation-delay.s]="badge.delay"
              style="transform: translate(-50%, -50%);"
            >
              {{ badge.label }}
            </div>

            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl glow-blue">
              <img
                src="assets/Full_photo.jpeg"
                alt="Aditya Khandelwal"
                class="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div
          [@fadeInUp]="{ value: 'visible', params: { delay: 1000 } }"
          class="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          <div *ngFor="let stat of stats" class="bg-bg-primary/80 px-6 py-5 text-center hover:bg-white/5 transition-colors">
            <div class="text-3xl font-black gradient-text-cyan mb-1">{{ stat.value }}</div>
            <div class="text-xs text-text-muted font-medium uppercase tracking-widest">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-bounce">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  `,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '700ms {{delay}}ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  protected stats = stats;
  protected floatingBadges = floatingBadges;

  private particles: Particle[] = [];
  private animationId?: number;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.initParticleCanvas();
  }

  calcBadgeX(i: number): number {
    const angle = (i / floatingBadges.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 155;
    return 188 + Math.cos(angle) * radius;
  }

  calcBadgeY(i: number): number {
    const angle = (i / floatingBadges.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 155;
    return 188 + Math.sin(angle) * radius;
  }

  private initParticleCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.stroke();
          }
        }
      }

      this.animationId = requestAnimationFrame(draw);
    };

    this.ngZone.runOutsideAngular(() => {
      draw();
    });
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  opacity: number;
}
