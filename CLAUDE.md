# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Git policy

- **Never run `git push` (or any command that publishes commits/branches to the remote) in this repo.** The user pushes manually themselves.
- Local commits, branches, diffs, and other local git operations are fine when explicitly requested.

## Project overview

Personal portfolio site built with **Angular 19** (standalone components, no NgModules) and **Tailwind CSS**. Pure Angular — no React/Vite remnants should be reintroduced.

- Entry point: [src/main.ts](src/main.ts) bootstraps [AppComponent](src/app/app.component.ts)
- Build/serve config: [angular.json](angular.json) — index is `src/index.html`, global styles are `src/styles/index.css`
- Tailwind config: [tailwind.config.js](tailwind.config.js)

## Conventions used in this codebase

- **Standalone components only.** Every component sets `standalone: true` and lists its own `imports`. Do not introduce NgModules.
- **One feature per folder** under `src/app/components/<name>/`, each with its own `.component.ts` (inline template/styles are common here — follow the existing pattern in a given component rather than splitting into separate `.html`/`.css` files unless the file is already split).
- **Services** for cross-cutting concerns (e.g. `scroll-detection.service.ts`, `animation.service.ts`) live in `src/app/services/`.
- **Directives** live in `src/app/directives/` (e.g. `fade-in.directive.ts` for scroll-triggered animations).
- Styling is Tailwind-first; shared custom CSS (glass morphism, gradients, heatmap cells, cursor, etc.) lives in `src/styles/index.css`.

## Angular best practices to follow

- Prefer standalone components, directives, and pipes — keep `imports` arrays minimal and explicit.
- Use Angular Signals or RxJS observables for state; avoid manual subscriptions without cleanup (use `async` pipe, `takeUntilDestroyed`, or `DestroyRef` instead of leaking subscriptions).
- Keep components presentation-focused; push data/logic into services when shared across components.
- Use `OnPush` change detection where practical for performance-sensitive components (e.g. anything doing canvas/animation work).
- Avoid direct DOM manipulation outside of `ElementRef`/`Renderer2`; wrap browser APIs (e.g. `IntersectionObserver`, `requestAnimationFrame`) so they're easy to clean up in `ngOnDestroy`.
- Run heavy/animation loops outside Angular's zone (`NgZone.runOutsideAngular`) and re-enter the zone only when updating bindings, to avoid unnecessary change detection cycles.
- Type everything strictly — this project uses TypeScript strict mode; don't introduce `any` without good reason.
- Keep bundle size in mind (current production build budget is 500kb warning / 1mb error in [angular.json](angular.json)); avoid adding heavy dependencies for small UI effects.
- Don't add files to `src/` outside the `app/`, `assets/`, `styles/` structure already in place (no stray root-level HTML/CSS/JS files — that's what caused the previous React/Vite leftovers).
