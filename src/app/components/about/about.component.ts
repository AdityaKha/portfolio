import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section-padding bg-bg-primary/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          About Me
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-text-secondary text-lg leading-relaxed mb-6">
              I'm a Senior Full-Stack Developer with expertise in Java, Spring Boot, and Angular.
            </p>
            <p class="text-text-secondary text-lg leading-relaxed">
              With 8+ years of experience, I've built scalable enterprise systems and mentored
              junior developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {}
