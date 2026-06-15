# Aditya Khandelwal - Portfolio

A modern, responsive personal portfolio website built with **Angular 19** and **Tailwind CSS**. Features smooth animations, scroll-triggered effects, and a comprehensive showcase of projects, skills, and experience.

## 🚀 Features

- **Angular 19** with standalone components and reactive patterns
- **Tailwind CSS** for responsive, utility-first styling
- **RxJS Observables** for scroll detection and state management
- **Angular Animations** for smooth transitions and entrance effects
- **Canvas Particle System** for dynamic hero background
- **Custom Directives** for reusable scroll-triggered animations
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Dark Mode Ready** with glass-morphism UI elements
- **TypeScript Strict Mode** for type-safe development
- **Production-Ready** with optimized build (~94 KB gzipped)

## 📋 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── hero/                 # Hero section with particle animation
│   │   ├── about/                # About & career timeline
│   │   ├── experience/           # Experience cards
│   │   ├── skills/               # Skills with progress bars
│   │   ├── projects/             # Featured projects
│   │   ├── education/            # Education & certifications
│   │   ├── contact/              # Contact form & social links
│   │   ├── navbar/               # Navigation with mobile menu
│   │   ├── footer/               # Footer with social links
│   │   ├── scroll-progress/      # Scroll indicator bar
│   │   ├── custom-cursor/        # Custom animated cursor
│   │   └── typewriter/           # Typewriter text animation
│   ├── directives/
│   │   └── fade-in.directive.ts  # Scroll-triggered fade-in
│   ├── services/
│   │   ├── scroll-detection.service.ts
│   │   └── animation.service.ts
│   └── app.component.ts          # Root component
├── styles/
│   └── index.css                 # Global styles & animations
├── main.ts                        # Bootstrap entry point
└── index.html                     # Root template
```

## 🛠️ Tech Stack

- **Framework:** Angular 19
- **Language:** TypeScript (ES2022, Strict Mode)
- **Styling:** Tailwind CSS v4
- **State Management:** RxJS Observables + Signals
- **Animations:** Angular Animations + CSS Animations
- **Build Tool:** Angular CLI
- **Package Manager:** npm

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200`

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Build output is in the `dist/` folder (ready for deployment).

### Bundle Size
- **Gzipped:** 94.12 KB
- **Raw:** 353.57 KB

## 🎨 Key Components

### Hero Section
- Particle canvas background animation
- Typewriter effect for dynamic role display
- Floating tech stack badges with orbital positioning
- Stats grid with key metrics

### About Section
- Career timeline with visual indicators
- Four pillars of expertise with descriptions

### Skills Section
- Categorized skill tabs (Backend, Frontend, Database, DevOps, Principles)
- Animated progress bars for proficiency levels

### Projects Section
- Three featured projects with expandable details
- Problem/Solution/Impact structure
- Technology stack display

### Experience & Education
- Expandable experience cards with metrics
- Academic background with certifications

### Contact Section
- Functional contact form with mailto integration
- Social media links (GitHub, LinkedIn, LeetCode)
- Location and availability information

## 🔧 Customization

### Update Personal Info
Edit contact details in:
- `src/app/components/contact/contact.component.ts`
- `src/app/components/hero/hero.component.ts`

### Modify Content
Each component contains data objects at the top:
- `roles`, `stats`, `floatingBadges` in Hero
- `experiences`, `education` in respective components
- `projects` in Projects component

### Styling
Global styles are in `src/styles/index.css`. Customize:
- Color theme in `tailwind.config.js`
- Animations and transitions in the main CSS file
- Component-level styles in component templates

## 🚀 Performance

- **Optimized** canvas particle rendering with `NgZone`
- **Lazy scroll detection** using IntersectionObserver
- **Efficient animations** using CSS where possible
- **Minimal dependencies** for smaller bundle size
- **Production-optimized** build with tree-shaking

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with Angular 19** | Deployed and maintained by Aditya Khandelwal
