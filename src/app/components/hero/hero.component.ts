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

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="hero"
      class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-20"
    >
      <!-- Particle canvas background -->
      <canvas
        #particleCanvas
        class="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      ></canvas>

      <!-- Content -->
      <div class="relative z-10 text-center px-6">
        <h1
          [@fadeInUp]="{ value: 'visible', params: { delay: 100 } }"
          class="text-5xl md:text-7xl font-bold text-text-primary mb-4 leading-tight"
        >
          Senior Full-Stack Developer
        </h1>
        <p
          [@fadeInUp]="{ value: 'visible', params: { delay: 200 } }"
          class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
        >
          Specializing in Java, Spring Boot, and Angular. Building scalable
          enterprise systems with modern technologies.
        </p>
        <div
          [@fadeInUp]="{ value: 'visible', params: { delay: 300 } }"
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" class="btn-primary px-8 py-3">
            <span>View My Work</span>
          </a>
          <a href="#contact" class="btn-outline px-8 py-3">
            <span>Get in Touch</span>
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          class="w-6 h-6 text-accent-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
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

  private particles: Particle[] = [];
  private animationId?: number;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initParticleCanvas();
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
        ctx.fillStyle = `rgba(79, 142, 247, ${p.opacity})`;
        ctx.fill();
      });

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
