import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section-padding bg-bg-primary/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Skills
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              Backend
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">Java</span>
              <span class="skill-tag">Spring Boot</span>
              <span class="skill-tag">SQL</span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              Frontend
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">Angular</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">CSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {}
