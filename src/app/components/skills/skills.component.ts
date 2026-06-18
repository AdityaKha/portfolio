import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const categories = [
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Java 17+', level: 95 },
      { name: 'Spring Boot', level: 92 },
      { name: 'Spring Security', level: 85 },
      { name: 'JPA / Hibernate', level: 87 },
      { name: 'Microservices', level: 84 },
      { name: 'Apache Kafka', level: 82 },
      { name: 'REST APIs', level: 95 },
      { name: 'Maven', level: 85 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'Angular', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'RxJS', level: 82 },
      { name: 'JavaScript (ES6)', level: 87 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'SCSS / SASS', level: 80 },
      { name: 'Bootstrap', level: 82 },
      { name: 'NPM', level: 85 },
    ],
  },
  {
    id: 'database',
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 90 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'Kubernetes', level: 70 },
      { name: 'AWS (EC2, S3, CF)', level: 75 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'CI/CD Pipelines', level: 78 },
      { name: 'Linux', level: 80 },
    ],
  },
];

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section-padding bg-gradient-dark">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Skills & Expertise
        </h2>
        <p class="text-text-secondary mb-12 max-w-2xl">
          Specialized in full-stack development with deep expertise across modern tech stacks
        </p>

        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            *ngFor="let cat of categories"
            (click)="activeCategory = cat.id"
            [ngClass]="{
              'btn-primary text-sm py-2 px-4': activeCategory === cat.id,
              'btn-outline text-sm py-2 px-4': activeCategory !== cat.id
            }"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Skill cards grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div *ngFor="let skill of getActiveSkills(); let i = index" class="glass-soft rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
            <div class="space-y-2">
              <div class="flex justify-between items-center mb-2">
                <span class="text-text-secondary text-sm font-semibold">{{ skill.name }}</span>
                <span class="text-text-muted text-xs font-mono bg-white/5 px-2 py-1 rounded-full">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-white/60 to-white/40"
                  [style.width.%]="skill.level"
                  style="transition: width 0.9s ease-out; box-shadow: 0 0 12px rgba(255,255,255,0.3);"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected categories = categories;
  activeCategory = 'backend';

  getActiveSkills() {
    return categories.find(c => c.id === this.activeCategory)?.skills || [];
  }
}
