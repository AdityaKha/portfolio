import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-white/5 py-8">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-center">
        <p class="text-text-muted text-xs">
          © 2026 Aditya Khandelwal.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
