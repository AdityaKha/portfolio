import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

const pillars = [
  {
    icon: '📐',
    title: 'Full-Stack Depth',
    desc: 'From database schema to pixel-perfect UI — I own the entire vertical slice, reducing handoff friction and shipping faster.',
  },
  {
    icon: '⚙️',
    title: 'Systems Thinking',
    desc: 'Kafka-driven event architectures, layered Spring Boot services, and horizontally scalable microservices that stay reliable under load.',
  },
  {
    icon: '⚡',
    title: 'Quality Culture',
    desc: 'SOLID principles, 30% higher test coverage with JUnit & Jasmine, and consistent production-bug reduction through disciplined refactoring.',
  },
  {
    icon: '👥',
    title: 'Engineering Leadership',
    desc: 'Mentored junior developers and drove a 20% improvement in team velocity by fostering best practices and clear technical communication.',
  },
];

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
          <p class="text-text-secondary max-w-xl mx-auto leading-relaxed">
            I don't just write code — I craft systems that perform, architectures that endure,
            and products that delight the people who use them.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <!-- Story -->
          <div appFadeIn class="space-y-5 text-text-secondary leading-relaxed">
            <p>
              My journey began with a single question:
              <em class="text-text-primary not-italic font-medium">
                "How do I build something people actually use?"
              </em>
              That question drove me through my B.Tech in Information Technology and has guided
              every technical decision since.
            </p>
            <p>
              At
              <span class="text-accent-blue font-semibold">DXC Technology</span>, I cut my
              teeth on high-traffic enterprise UIs — learning that every millisecond and every
              defect matters. I reduced UI defects by 20% and shipped an MVP in just 6 weeks by
              building trust between design, backend, and frontend teams.
            </p>
            <p>
              Today, at
              <span class="text-accent-blue font-semibold">Exsete Consulting</span>, I build
              full-stack features for internal Google applications serving
              <span class="text-text-primary font-semibold">10,000+ users</span>
              daily. I
              design event-driven pipelines with Apache Kafka, enforce security with JWT and
              OAuth2, and continuously push code quality higher.
            </p>
            <p>
              Beyond technical skills, I believe great engineers are multipliers — so I invest in
              mentoring, code review culture, and documentation that outlasts any single developer.
            </p>
          </div>

          <!-- Career timeline -->
          <div class="relative pl-6">
            <div class="absolute left-0 top-0 bottom-0 w-px timeline-line opacity-30"></div>
            <div *ngFor="let item of timeline; let i = index" class="relative mb-8 last:mb-0">
              <div class="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg-primary shadow-[0_0_8px_rgba(79,142,247,0.6)]"></div>
              <div class="glass rounded-xl px-4 py-3 border border-white/5 hover:border-accent-blue/20 transition-colors">
                <span class="section-label text-accent-blue text-[11px]">{{ item.year }}</span>
                <p class="text-text-secondary text-sm mt-1 leading-snug">{{ item.event }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pillars -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div *ngFor="let pillar of pillars; let i = index" class="glass rounded-2xl p-5 border border-white/5 card-hover h-full">
            <div class="text-2xl mb-4">{{ pillar.icon }}</div>
            <h3 class="text-text-primary font-semibold text-sm mb-2">{{ pillar.title }}</h3>
            <p class="text-text-muted text-xs leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected pillars = pillars;
  protected timeline = timeline;
}
