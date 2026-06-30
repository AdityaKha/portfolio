import { ChangeDetectionStrategy, Component } from '@angular/core';

const contactLinks = [
  {
    label: 'LinkedIn',
    handle: 'aditya-kha',
    href: 'https://linkedin.com/in/aditya-kha',
    description: 'Connect professionally',
  },
  {
    label: 'X (Twitter)',
    handle: '@IamAdityaKh',
    href: 'https://x.com/IamAdityaKh',
    description: 'Follow for updates',
  },
  {
    label: 'Email',
    handle: 'khandelwal.aditya5',
    href: 'mailto:khandelwal.aditya5@gmail.com',
    description: 'Drop me a message',
  },
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section-padding relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-8">
          <h2 class="text-3xl sm:text-5xl font-black text-text-primary leading-tight mb-3">
            Let's Build
            <br />
            <span class="gradient-text">Something Together</span>
          </h2>
          <p class="text-sm sm:text-base text-text-secondary max-w-md mx-auto">
            Whether you have a role in mind, a project to discuss, or just want to connect —
            my inbox is always open.
          </p>
        </div>

        <div class="flex flex-col sm:grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          @for (link of contactLinks; track link.label) {
            <a
              [href]="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group glass border border-white/10 rounded-xl px-4 py-3 sm:py-6 sm:px-5 flex flex-row sm:flex-col items-center gap-3 sm:gap-3 sm:text-center hover:border-accent-blue/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div class="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center glass border border-white/10 group-hover:border-accent-blue/30 transition-colors">
                @if (link.label === 'LinkedIn') {
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-text-secondary group-hover:text-accent-blue transition-colors">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                @if (link.label === 'X (Twitter)') {
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-text-secondary group-hover:text-accent-blue transition-colors">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
                @if (link.label === 'Email') {
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-secondary group-hover:text-accent-blue transition-colors">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                }
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-text-primary">{{ link.label }}</div>
                <div class="text-xs text-text-muted sm:mb-1">{{ link.description }}</div>
                <div class="text-xs text-text-secondary font-mono truncate">{{ link.handle }}</div>
              </div>
              <svg class="sm:hidden w-3.5 h-3.5 flex-shrink-0 text-text-muted group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected contactLinks = contactLinks;
}
