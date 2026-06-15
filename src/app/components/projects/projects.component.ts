import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Projects
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="glass rounded-2xl p-6 card-hover">
            <h3 class="text-xl font-semibold text-text-primary mb-2">
              Portfolio Website
            </h3>
            <p class="text-text-secondary mb-4">
              A modern portfolio built with Angular and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {}
