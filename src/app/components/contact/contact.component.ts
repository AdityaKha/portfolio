import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const socials = [
  {
    label: 'GitHub',
    handle: '@AdityaKha',
    href: 'https://github.com/AdityaKha',
    icon: '🐙',
  },
  {
    label: 'LinkedIn',
    handle: 'aditya-kha',
    href: 'https://linkedin.com/in/aditya-kha',
    icon: '💼',
  },
  {
    label: 'LeetCode',
    handle: 'adityakha',
    href: 'https://leetcode.com/u/adityakha',
    icon: '📝',
  },
  {
    label: 'Email',
    handle: 'khandelwal.aditya5',
    href: 'mailto:khandelwal.aditya5@gmail.com',
    icon: '✉️',
  },
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="section-padding relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
            Let's Build
            <br />
            <span class="gradient-text">Something Together</span>
          </h2>
          <p class="text-text-secondary max-w-md mx-auto">
            Whether you have a role in mind, a project to discuss, or just want to connect —
            my inbox is always open.
          </p>
        </div>

        <div class="grid lg:grid-cols-5 gap-8 items-start">
          <!-- Left info panel -->
          <div class="lg:col-span-2">
            <div class="space-y-6">
              <!-- Location -->
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0">
                  📍
                </div>
                <div>
                  <p class="text-text-primary font-semibold text-sm">Location</p>
                  <p class="text-text-muted text-sm">Gurugram, India</p>
                  <p class="text-text-muted text-xs">Open to remote opportunities</p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0">
                  📱
                </div>
                <div>
                  <p class="text-text-primary font-semibold text-sm">Phone</p>
                  <p class="text-text-muted text-sm">+91-9997720565</p>
                </div>
              </div>

              <!-- Response time -->
              <div class="glass rounded-2xl p-4 border border-white/5">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span class="text-green-400 text-xs font-semibold">Available Now</span>
                </div>
                <p class="text-text-muted text-xs leading-relaxed">
                  Actively seeking full-stack engineering roles. I typically respond within 24 hours.
                </p>
              </div>

              <!-- Social links -->
              <div class="space-y-2.5">
                <a
                  *ngFor="let s of socials"
                  [href]="s.href"
                  [target]="s.href.startsWith('mailto') ? '_self' : '_blank'"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 p-3 glass rounded-xl border border-white/5 hover:border-accent-blue/40 transition-all duration-200 card-hover"
                >
                  <span class="text-text-muted group-hover:text-accent-blue transition-colors text-lg">
                    {{ s.icon }}
                  </span>
                  <div class="min-w-0">
                    <p class="text-text-secondary text-xs font-semibold group-hover:text-accent-blue transition-colors">
                      {{ s.label }}
                    </p>
                    <p class="text-text-muted text-[11px] truncate">{{ s.handle }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Right: contact form -->
          <div class="lg:col-span-3">
            <div class="glass rounded-2xl p-6 sm:p-8 border border-white/5">
              <div *ngIf="!sent(); else sentMessage">
                <form (ngSubmit)="handleSubmit()" class="space-y-5">
                  <div class="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-text-muted text-xs font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="form.name"
                        name="name"
                        required
                        placeholder="Jane Smith"
                        class="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-accent-blue/5 transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-text-muted text-xs font-medium mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        [(ngModel)]="form.email"
                        name="email"
                        required
                        placeholder="jane@company.com"
                        class="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-accent-blue/5 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-text-muted text-xs font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      [(ngModel)]="form.message"
                      name="message"
                      required
                      rows="5"
                      placeholder="Tell me about the opportunity, project, or just say hi..."
                      class="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:bg-accent-blue/5 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    [disabled]="loading()"
                    class="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm disabled:opacity-50"
                  >
                    <span>{{ loading() ? 'Opening Mail...' : 'Send Message' }}</span>
                    ✉️
                  </button>
                  <p class="text-center text-text-muted text-xs">
                    Or email directly at
                    <a
                      href="mailto:khandelwal.aditya5&#64;gmail.com"
                      class="text-accent-blue hover:underline"
                    >
                      khandelwal.aditya5&#64;gmail.com
                    </a>
                  </p>
                </form>
              </div>

              <ng-template #sentMessage>
                <div class="flex flex-col items-center justify-center py-12 text-center">
                  <span class="text-4xl mb-4">✅</span>
                  <h3 class="text-text-primary font-bold text-xl mb-2">Message Sent!</h3>
                  <p class="text-text-muted text-sm">
                    Your default mail app should have opened. Thanks for reaching out — I'll be in
                    touch soon.
                  </p>
                  <button
                    class="mt-6 btn-outline text-sm py-2 px-5"
                    (click)="resetForm()"
                  >
                    Send Another
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected socials = socials;

  form = {
    name: '',
    email: '',
    message: '',
  };

  sent = signal(false);
  loading = signal(false);

  handleSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) {
      return;
    }

    this.loading.set(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${this.form.name}`);
    const body = encodeURIComponent(
      `Name: ${this.form.name}\nEmail: ${this.form.email}\n\nMessage:\n${this.form.message}`
    );
    window.location.href = `mailto:khandelwal.aditya5@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      this.sent.set(true);
      this.loading.set(false);
    }, 800);
  }

  resetForm() {
    this.sent.set(false);
    this.form = { name: '', email: '', message: '' };
  }
}
