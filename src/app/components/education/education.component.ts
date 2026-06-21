import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const certs = [
  { name: 'Spring Boot & Microservices', issuer: 'Udemy', icon: '⚙️' },
  { name: 'MEAN Stack Development', issuer: 'Udemy', icon: '🌐' },
  { name: 'Angular Framework', issuer: 'Udemy', icon: '🔴' },
  { name: 'HTML, CSS & JavaScript', issuer: 'Johns Hopkins University', icon: '🎓' },
  { name: 'C Programming', issuer: 'NPTEL', icon: '💻' },
];

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="section-padding relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            Knowledge
            <br />
            <span class="gradient-text">Foundation</span>
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 items-start">
          <!-- Education card -->
          <div>
            <div class="flex items-center gap-2 mb-5">
              <span class="text-lg">🎓</span>
              <h3 class="text-text-primary font-bold text-base">Academic Background</h3>
            </div>
            <div class="glass rounded-2xl p-6 border border-white/5 card-hover relative overflow-hidden">
              <div class="relative">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-bold text-accent-blue mb-4">
                  🎓 Bachelor of Technology
                </span>

                <h4 class="text-text-primary font-bold text-xl leading-tight mb-1">
                  Information Technology
                </h4>
                <p class="text-accent-blue font-semibold text-sm mb-3">
                  ABES Engineering College
                </p>

                <div class="flex flex-wrap items-center gap-4 mb-5">
                  <div class="flex items-center gap-1.5 text-text-muted text-sm">
                    <span>📅</span>
                    <span>2018 – 2022</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm">🏅</span>
                    <span class="text-text-primary font-bold text-sm">CGPA: 8.17</span>
                    <span class="text-text-muted text-xs">/ 10</span>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-text-muted">
                    <span>Academic Performance</span>
                    <span class="font-semibold text-accent-blue">81.7%</span>
                  </div>
                  <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full bg-accent-blue"
                      style="width: 81.7%; transition: width 1s ease-out;"
                    ></div>
                  </div>
                </div>

                <div class="mt-5 pt-5 border-t border-white/5">
                  <p class="text-text-muted text-xs leading-relaxed">
                    Four years of rigorous study in software engineering, algorithms, database systems,
                    operating systems, and computer networks — forming the technical bedrock for
                    building enterprise-grade applications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div>
            <div class="flex items-center gap-2 mb-5">
              <span class="text-lg">🏆</span>
              <h3 class="text-text-primary font-bold text-base">Certifications</h3>
            </div>
            <div class="space-y-3">
              <div *ngFor="let cert of certs" class="glass rounded-xl px-4 py-3.5 border border-white/5 card-hover flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-lg flex-shrink-0">
                  {{ cert.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-text-primary font-semibold text-sm leading-tight truncate">
                    {{ cert.name }}
                  </p>
                  <p class="text-text-muted text-xs mt-0.5">{{ cert.issuer }}</p>
                </div>
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <span class="text-green-400 text-[10px]">✓</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  protected certs = certs;
}
