import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="gradient-text">
      {{ displayed }}<span class="animate-pulse text-accent-blue">|</span>
    </span>
  `,
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() words: string[] = [];

  displayed = '';
  private index = 0;
  private deleting = false;
  private waiting = false;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.startTyping();
  }

  private startTyping() {
    const typeCharacter = () => {
      if (this.waiting) {
        setTimeout(typeCharacter, 1800);
        this.waiting = false;
        return;
      }

      const word = this.words[this.index];

      if (!this.deleting) {
        if (this.displayed.length < word.length) {
          this.displayed = word.slice(0, this.displayed.length + 1);
          setTimeout(typeCharacter, 60);
        } else {
          this.deleting = true;
          setTimeout(typeCharacter, 2000);
        }
      } else {
        if (this.displayed.length > 0) {
          this.displayed = this.displayed.slice(0, -1);
          setTimeout(typeCharacter, 35);
        } else {
          this.deleting = false;
          this.waiting = true;
          this.index = (this.index + 1) % this.words.length;
          setTimeout(typeCharacter, 0);
        }
      }
    };

    typeCharacter();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
