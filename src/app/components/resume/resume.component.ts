import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';

const RESUME_PATH = 'assets/Aditya_Khandelwal_SDE2_Resume_pdf.pdf';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FadeInDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="resume" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">

        <!-- Section header -->
        <div class="text-center mb-12" appFadeIn>
          <span class="section-label">Documents</span>
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mt-2 mb-4">
            My <span class="gradient-text">Resume</span>
          </h2>
          <p class="text-text-secondary max-w-xl mx-auto">
            A snapshot of my experience, skills, and accomplishments.
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3 mb-10" appFadeIn>
          <a
            [href]="resumePath"
            download="Aditya_Khandelwal_Resume.pdf"
            class="btn-primary text-sm py-3 px-6 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
          <button
            (click)="togglePreview()"
            class="btn-outline text-sm py-3 px-6 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {{ previewOpen() ? 'Hide Preview' : 'Preview Resume' }}
          </button>
        </div>

        <!-- Embedded PDF preview -->
        @if (previewOpen()) {
          <div class="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl" appFadeIn>
            <div class="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <span class="text-text-secondary text-sm font-medium">Aditya_Khandelwal_Resume.pdf</span>
              <a
                [href]="resumePath"
                download="Aditya_Khandelwal_Resume.pdf"
                class="text-accent-blue hover:text-accent-blue/80 transition-colors text-sm flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </a>
            </div>
            <iframe
              [src]="safeResumePath"
              class="w-full"
              style="height: min(80vh, 1050px);"
              title="Aditya Khandelwal Resume"
              loading="lazy"
            ></iframe>
          </div>
        }

      </div>
    </section>
  `,
})
export class ResumeComponent {
  private sanitizer = inject(DomSanitizer);

  protected readonly resumePath = RESUME_PATH;
  protected readonly safeResumePath: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(RESUME_PATH);
  protected readonly previewOpen = signal(false);

  togglePreview() {
    this.previewOpen.update(v => !v);
  }
}
