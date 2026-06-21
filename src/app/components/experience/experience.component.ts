import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  style,
} from '@angular/animations';

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Exsete Consulting Pvt. Ltd.',
    period: 'Apr 2023 – Present',
    location: 'Gurugram, India',
    type: 'Full-time',
    tag: 'Current',
    highlights: [
      '🚀 Built scalable full-stack features for internal Google applications used by 10,000+ daily active users',
      '⚡ Enhanced REST APIs using Spring Boot with clean layered architecture (Controller → Service → Repository)',
      '🔧 Developed modular Angular modules leveraging RxJS observables and reactive patterns',
      '✅ Improved test coverage by 30% using JUnit, Mockito (backend) and Jasmine, Karma (frontend)',
      '🐛 Reduced production bugs by 30% through systematic refactoring and strict SOLID principle adherence',
      '📨 Implemented event-driven notification workflows using Apache Kafka for asynchronous processing',
      '👥 Mentored junior developers, driving a 20% improvement in overall team delivery velocity',
    ],
    stack: ['Java 17+', 'Spring Boot', 'Angular', 'Kafka', 'PostgreSQL', 'JWT', 'AWS', 'Docker'],
  },
  {
    role: 'Associate Software Engineer',
    company: 'DXC Technology',
    period: 'Jun 2022 – Mar 2023',
    location: 'India',
    type: 'Full-time',
    tag: 'Previous',
    highlights: [
      '🎨 Created enterprise UI components using Angular, JavaScript, HTML, CSS, and GraphQL for high-traffic applications',
      '🔍 Reduced UI defects by 20% through systematic code reviews and targeted refactoring',
      '🎯 Improved UX consistency and reduced bounce rate by 15% through design system alignment',
      '⏱️ Delivered a production MVP in just 6 weeks through tight cross-functional collaboration with backend and design',
    ],
    stack: ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'GraphQL'],
  },
];

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="section-padding">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            Where I've
            <br />
            <span class="gradient-text">Made an Impact</span>
          </h2>
          <p class="text-text-secondary max-w-md mx-auto">
            Every role has sharpened a different edge — click each to explore the full story.
          </p>
        </div>

        <div class="space-y-4">
          <div *ngFor="let exp of experiences; let i = index" class="glass rounded-2xl border border-white/5 overflow-hidden card-hover">
            <button
              class="w-full text-left p-6 flex items-start justify-between gap-4 group"
              (click)="toggleExpanded(i)"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-blue flex items-center justify-center text-white font-black text-sm"
                >
                  {{ exp.company.charAt(0) }}
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap mb-1">
                    <h3 class="text-text-primary font-bold text-lg leading-tight">
                      {{ exp.role }}
                    </h3>
                    <span
                      *ngIf="exp.tag === 'Current'"
                      class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-500/15 text-green-400 border border-green-500/30"
                    >
                      Current
                    </span>
                  </div>
                  <p class="text-accent-blue font-semibold text-sm mb-2">{{ exp.company }}</p>
                  <div class="flex flex-wrap items-center gap-3 text-text-muted text-xs">
                    <span>📅 {{ exp.period }}</span>
                    <span>📍 {{ exp.location }}</span>
                  </div>
                </div>
              </div>
              <div
                class="flex-shrink-0 text-text-muted group-hover:text-text-secondary transition-colors mt-1"
                [style.transform]="'rotate(' + (expandedIndex === i ? 180 : 0) + 'deg)'"
              >
                ▼
              </div>
            </button>

            <!-- Expandable content -->
            <div
              *ngIf="expandedIndex === i"
              [@expandCollapse]
              class="px-6 pb-6 border-t border-white/5 pt-5"
            >
              <ul class="space-y-2.5 mb-6">
                <li *ngFor="let h of exp.highlights" class="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                  <span class="text-base flex-shrink-0 mt-0.5">{{ h.charAt(0) }}</span>
                  <span>{{ h.substring(2) }}</span>
                </li>
              </ul>

              <!-- Tech stack -->
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of exp.stack" class="skill-tag">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ExperienceComponent {
  protected experiences = experiences;
  expandedIndex = 0;

  toggleExpanded(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }
}
