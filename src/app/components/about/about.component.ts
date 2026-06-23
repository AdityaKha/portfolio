import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

const timeline = [
  { year: '2018', event: 'Started B.Tech in Information Technology at ABES Engineering College' },
  { year: '2022', event: 'Graduated with CGPA 8.17 — began career at DXC Technology' },
  { year: '2023', event: 'Joined Exsete Consulting, building tools for 10,000+ Google users' },
  { year: '2024', event: 'Led full-stack compliance platform with Kafka event-driven architecture' },
  { year: '2026', event: 'Continuing to architect scalable systems and mentor engineers' },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  template: `
    <section id="about" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Section header -->
        <div class="text-center mb-16" appFadeIn>
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            The Engineer
            <br />
            <span class="gradient-text">Behind the Code</span>
          </h2>
        </div>

        <!-- Career timeline -->
        <div class="relative max-w-2xl mx-auto" appFadeIn>
          <div class="absolute left-[5px] top-0 bottom-0 w-0.5 timeline-line opacity-30"></div>
          <div *ngFor="let item of timeline; let i = index" class="relative flex items-start gap-4 pb-8 last:pb-0">
            <div class="relative z-10 mt-1 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg-primary shadow-[0_0_8px_rgba(79,142,247,0.6)] flex-shrink-0"></div>
            <div class="glass rounded-xl px-4 py-3 border border-white/5 hover:border-accent-blue/20 transition-colors flex-1">
              <span class="section-label text-accent-blue text-[11px]">{{ item.year }}</span>
              <p class="text-text-secondary text-sm mt-1 leading-snug">{{ item.event }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected timeline = timeline;
}
