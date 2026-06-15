import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Experience
        </h2>
        <div class="space-y-8">
          <div class="glass rounded-2xl p-6">
            <h3 class="text-xl font-semibold text-text-primary mb-2">
              Senior Developer
            </h3>
            <p class="text-text-secondary mb-4">
              Building enterprise applications with Java, Spring Boot, and Angular
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {}
