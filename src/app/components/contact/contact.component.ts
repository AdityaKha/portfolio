import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="section-padding">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          Get in Touch
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p class="text-text-secondary text-lg mb-6">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <a
              href="mailto:khandelwal.aditya5@gmail.com"
              class="btn-primary inline-block"
            >
              <span>Send an Email</span>
            </a>
          </div>
          <div class="glass rounded-2xl p-8">
            <form class="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  class="w-full px-4 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  class="w-full px-4 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message"
                  rows="5"
                  class="w-full px-4 py-2 bg-bg-secondary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue"
                ></textarea>
              </div>
              <button type="submit" class="btn-primary w-full">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
    }
  }
}
