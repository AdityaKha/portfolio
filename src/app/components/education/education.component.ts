import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="education" class="section-padding relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            Knowledge
            <br />
            <span class="gradient-text">Foundation</span>
          </h2>
        </div>

        <div class="glass rounded-2xl border border-white/5 overflow-hidden">

          <!-- Top section: degree info + CGPA stat -->
          <div class="p-4 sm:p-8 border-b border-white/5">
            <div class="flex items-start gap-4 sm:gap-5">

              <!-- Left column: logo, then CGPA below it on mobile only -->
              <div class="flex flex-col items-center gap-3 flex-shrink-0">
                <img
                  src="assets/abes_Logo.png"
                  alt="ABES Engineering College"
                  class="w-16 h-16 sm:w-24 sm:h-24 object-contain grayscale opacity-80"
                />
                <div class="sm:hidden text-center">
                  <div class="text-2xl font-black text-text-primary tracking-tight">8.17</div>
                  <div class="text-text-muted text-xs mt-0.5 uppercase tracking-widest">CGPA / 10</div>
                </div>
              </div>

              <!-- Degree info -->
              <div class="flex-1 min-w-0">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-bold text-accent-blue mb-3 sm:mb-5">
                  Bachelor of Technology
                </span>
                <h3 class="text-text-primary font-bold text-xl sm:text-2xl leading-tight mb-1">
                  Information Technology
                </h3>
                <p class="text-text-secondary font-medium text-sm mb-3 sm:mb-4">
                  ABES Engineering College
                </p>
                <div class="flex items-center gap-1.5 text-text-muted text-xs">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>2018 – 2022</span>
                </div>
              </div>

              <!-- CGPA: desktop only (hidden on mobile, shown sm+) -->
              <div class="hidden sm:block flex-shrink-0 text-right">
                <div class="text-5xl font-black text-text-primary tracking-tight">8.17</div>
                <div class="text-text-muted text-xs mt-1 uppercase tracking-widest">CGPA / 10</div>
              </div>

            </div>
          </div>

          <!-- Description -->
          <div class="px-4 py-4 sm:px-8 sm:py-6">
            <p class="text-text-muted text-sm leading-relaxed">
              Four years of rigorous study in software engineering, algorithms, database systems,
              operating systems, and computer networks — forming the technical bedrock for
              building enterprise-grade applications.
            </p>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {}
