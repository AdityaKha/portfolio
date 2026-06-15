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
    <section id="skills" class="section-padding bg-bg-primary/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Skills & Expertise
        </h2>

        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2 mb-8">
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

        <!-- Skill bars -->
        <div class="space-y-5">
          <div *ngFor="let skill of getActiveSkills(); let i = index">
            <div class="space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="text-text-secondary text-xs font-medium">{{ skill.name }}</span>
                <span class="text-text-muted text-[10px] font-mono">{{ skill.level }}%</span>
              </div>
              <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  [style.width.%]="skill.level"
                  style="transition: width 0.9s ease-out;"
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
