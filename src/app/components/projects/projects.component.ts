import { ChangeDetectionStrategy, Component } from '@angular/core';

const projects = [
  {
    id: 'central-desk',
    title: 'Central-Desk',
    subtitle: 'Internal Operations Platform',
    company: 'CallHealth Services',
    logo: 'assets/callHealth_logo.png',
    logoBg: 'black',
    category: 'Healthcare',
    status: 'Live',
    stack: ['Angular 20', 'Java 21', 'Spring Boot', 'MySQL', 'REST APIs'],
    overview:
      'An internal operations platform built from scratch to track leads and diagnostic centers, enabling streamlined healthcare service coordination across CallHealth operations teams.',
    problem:
      'Internal teams had no centralized system to manage leads and diagnostic center workflows, resulting in fragmented coordination across channels and no single source of truth for operations data.',
    solution:
      'Designed and built the full stack end-to-end — Angular 20 frontend, Java 21 Spring Boot REST APIs, and MySQL — with a clean layered architecture optimized for rapid iteration and production readiness.',
    impact: [
      '🚀 Delivered end-to-end from scratch to production in under 2 months',
      '📋 Centralized lead tracking and diagnostic center management for operations teams',
      '⚡ RESTful API architecture with Angular 20 frontend and Java 21 Spring Boot backend',
      '🏥 Live in production and actively used by CallHealth internal operations',
    ],
  },
  {
    id: 'prachtiz',
    title: 'PraCHtiz',
    subtitle: 'Doctor-Patient Consultation App',
    company: 'CallHealth Services',
    logo: 'assets/callHealth_logo.png',
    logoBg: 'black',
    category: 'Healthcare',
    status: 'In Progress',
    stack: ['Angular 20', 'Java 21', 'Spring Boot', 'MySQL', 'WebRTC', 'Video Calling'],
    overview:
      'A patient-facing consultation platform being built from scratch, enabling live video consultations between doctors and patients to expand digital healthcare access.',
    problem:
      'Patients lacked a seamless digital channel to consult with doctors remotely, creating friction in care delivery and limiting healthcare reach for CallHealth\'s patient base.',
    solution:
      'Building a full-stack consultation app with Angular 20 and Spring Boot, integrating WebRTC for real-time peer-to-peer video sessions with low latency and secure session handling.',
    impact: [
      '📹 WebRTC-powered live video consultations between doctors and patients',
      '🏥 Patient-facing platform built for scale from scratch',
      '⚡ Real-time, low-latency peer-to-peer video communication',
      '🔒 Secure consultation sessions with end-to-end encrypted video streams',
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance & Risk Management System',
    subtitle: 'Enterprise Full-Stack Platform',
    company: 'Exsete Consulting',
    logo: 'assets/exsete-logo.png',
    logoBg: 'black',
    category: 'Enterprise',
    status: null,
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'Kafka', 'Docker', 'AWS'],
    overview:
      'A full-stack compliance platform that centralized compliance workflows, evidence management, and audit tracking for enterprise teams — replacing fragmented manual processes with a unified, secure system.',
    problem:
      'Teams were managing compliance data across spreadsheets and email threads, making audits time-consuming, error-prone, and impossible to trace systematically.',
    solution:
      'Designed a layered Spring Boot architecture with strict role-based authorization, an Evidence Locker for secure document storage, and Kafka-driven notifications to keep teams in sync asynchronously.',
    impact: [
      '🔐 JWT + OAuth2 auth securing all user roles and data access',
      '📁 Evidence Locker system enabling structured document storage and retrieval',
      '📋 Full audit logging (who did what, when) for compliance traceability',
      '⚡ Kafka integration for real-time async notifications across workflow stages',
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance Management System',
    subtitle: 'Desktop Application',
    company: 'Academic Project',
    logo: 'assets/abes_Logo.png',
    logoBg: 'black',
    category: 'Desktop',
    status: null,
    stack: ['Java', 'JSP', 'Servlets', 'Oracle SQL', 'JDBC'],
    overview:
      'A desktop-based student attendance tracking system for academic institutions — built with Java server-side technologies, secure credential management, and automated reporting.',
    problem:
      'Manual paper-based attendance tracking was slow, prone to data loss, and offered no reporting visibility for administrators or faculty.',
    solution:
      'Designed a Java Servlet MVC architecture backed by Oracle SQL, with role-separated access for administrators and instructors, and built-in report generation to surface attendance patterns.',
    impact: [
      '📊 Built-in reporting for attendance analytics and pattern detection',
      '🔒 Secure credential management with hashed passwords and session tokens',
      '🏫 Supports multiple courses, batches, and instructor roles',
      '📋 Export-ready reports for compliance and parent communication',
    ],
  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="section-padding relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            Featured
            <br />
            <span class="gradient-text">Projects</span>
          </h2>
          <p class="text-text-secondary max-w-md mx-auto">
            A selection of full-stack projects that demonstrate ownership, impact, and technical depth.
          </p>
        </div>

        <div class="space-y-6">
          @for (project of projects; track project.id; let i = $index) {
            <div class="glass rounded-2xl border border-white/5 overflow-hidden card-hover">
              <!-- Top section -->
              <div class="p-6">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div class="flex items-start gap-4">
                    <div
                      class="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 overflow-hidden"
                      [class.bg-white]="project.logoBg === 'white'"
                      [class.bg-black]="project.logoBg === 'black'"
                      [class.bg-accent-blue]="!project.logo"
                    >
                      @if (project.logo) {
                        <img
                          [src]="project.logo"
                          [alt]="project.company + ' logo'"
                          class="w-full h-full object-contain p-1.5"
                        />
                      } @else {
                        <span>📦</span>
                      }
                    </div>
                    <div>
                      <div class="flex items-center gap-2 flex-wrap mb-0.5">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/30">
                          {{ project.category }}
                        </span>
                        @if (project.status) {
                          <span
                            class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                            [class.bg-emerald-500/10]="project.status === 'Live'"
                            [class.text-emerald-400]="project.status === 'Live'"
                            [class.border-emerald-500/30]="project.status === 'Live'"
                            [class.bg-amber-500/10]="project.status === 'In Progress'"
                            [class.text-amber-400]="project.status === 'In Progress'"
                            [class.border-amber-500/30]="project.status === 'In Progress'"
                          >{{ project.status }}</span>
                        }
                        <span class="text-text-muted text-[10px]">{{ project.company }}</span>
                      </div>
                      <h3 class="text-text-primary font-bold text-lg leading-tight">
                        {{ project.title }}
                      </h3>
                      <p class="text-text-muted text-sm">{{ project.subtitle }}</p>
                    </div>
                  </div>
                </div>

                <!-- Overview -->
                <p class="text-text-secondary text-sm leading-relaxed mb-4">
                  {{ project.overview }}
                </p>

                <!-- Tech stack -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                  @for (t of project.stack; track t) {
                    <span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/8 text-text-muted">
                      {{ t }}
                    </span>
                  }
                </div>

                <!-- Expand toggle -->
                <button
                  (click)="toggleProject(i)"
                  class="flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-secondary transition-colors"
                >
                  {{ expandedIndex === i ? 'Show Less' : 'Deep Dive' }}
                  <span [style.transform]="'rotate(' + (expandedIndex === i ? 90 : 0) + 'deg)'">›</span>
                </button>
              </div>

              <!-- Expanded detail -->
              @if (expandedIndex === i) {
                <div class="px-6 pb-6 border-t border-white/5 pt-5 space-y-5">
                  <!-- Problem -->
                  <div>
                    <h4 class="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                      → The Problem
                    </h4>
                    <p class="text-text-secondary text-sm leading-relaxed">{{ project.problem }}</p>
                  </div>
                  <!-- Solution -->
                  <div>
                    <h4 class="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                      → The Solution
                    </h4>
                    <p class="text-text-secondary text-sm leading-relaxed">{{ project.solution }}</p>
                  </div>
                  <!-- Impact -->
                  <div>
                    <h4 class="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
                      → Key Deliverables
                    </h4>
                    <ul class="space-y-2">
                      @for (item of project.impact; track item) {
                        <li class="flex items-start gap-2.5 text-sm text-text-secondary">
                          <span class="flex-shrink-0 mt-0.5">{{ item.charAt(0) }}</span>
                          <span>{{ item.substring(2) }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected projects = projects;
  expandedIndex = -1;

  toggleProject(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }
}
