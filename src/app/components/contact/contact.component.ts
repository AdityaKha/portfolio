import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      </div>
    </section>
  `,
})
export class ContactComponent {
}
