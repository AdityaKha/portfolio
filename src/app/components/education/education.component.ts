import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="section-padding bg-bg-primary/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Education
        </h2>
        <div class="space-y-8">
          <div class="glass rounded-2xl p-6">
            <h3 class="text-xl font-semibold text-text-primary mb-2">
              B.Tech in Computer Science
            </h3>
            <p class="text-text-secondary">
              Institute of Technology
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {}
