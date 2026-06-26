import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { GitHubProfileComponent } from './components/github-profile/github-profile.component';
import { LeetcodeProfileComponent } from './components/leetcode-profile/leetcode-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    CustomCursorComponent,
    ScrollProgressComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    GitHubProfileComponent,
    LeetcodeProfileComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="relative overflow-x-hidden">
      <app-custom-cursor></app-custom-cursor>
      <app-scroll-progress></app-scroll-progress>
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-leetcode-profile></app-leetcode-profile>
        <app-about></app-about>
        <app-experience></app-experience>
        <app-github-profile></app-github-profile>
        <app-projects></app-projects>
        <app-education></app-education>
        <app-contact></app-contact>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
