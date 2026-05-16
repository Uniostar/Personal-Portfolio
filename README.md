# Aryan Kumar — ECE Portfolio

A futuristic, dark-mode personal portfolio built with **React + Vite + Tailwind CSS**.  
Sections: Home (Hero / Skills / Timeline) · Projects (Competition / PCB / Blog) · Contact.

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.  
Hot-reload is enabled — changes to any file update the browser instantly.

### Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # locally preview the production build
```

---

## GitHub Pages Deployment

1. In `vite.config.js`, set `base` to your repository name:
   ```js
   base: '/your-repo-name/',
   ```
2. Build and push the `dist/` folder to the `gh-pages` branch, or use the
   [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) action.

> The site uses `HashRouter` (URLs like `/#/projects`) so no server-side routing config is needed.

---

## Adding your profile photo

Drop your headshot at:
```
public/assets/profile.jpg
```
The Hero section loads `/assets/profile.jpg` and shows an "AK" monogram fallback if the file is missing.

---

## Adding PCB images

Each PCB card expects 5 images under `public/pcb-data/{slug}/`:

| File | Contents |
|------|----------|
| `photo-1.jpg` | Assembled / finished PCB photo |
| `photo-2.jpg` | KiCad PCB layout screenshot |
| `photo-3.jpg` | 3D render — front view |
| `photo-4.jpg` | 3D render — back view |
| `schematic.jpg` | Full schematic screenshot |

Cards show a styled placeholder for any missing image — add photos incrementally.

---

## Project structure

```
src/
  components/
    layout/      Navbar, Footer
    home/        Hero, ParticleBackground, StatsCards, Timeline
    projects/    ProjectFilter, CompetitionProjects, PCBGrid, PCBCard,
                 PhotoSlideshow, BlogGrid
    contact/     ContactSection
    ui/          GlassCard, NeonButton, AnimatedSection, SectionHeader
  data/
    competitionProjects.js   — competition card content
    blogPosts.js             — Hackster.io post metadata
    pcbPhotoData.js          — hardcoded photo captions for PCB slideshow
  pages/         Home, Projects, Contact
  App.jsx        Router + page transitions
  index.css      Global styles, glassmorphism utilities, animations

public/
  pcb-data/{slug}/info.json  — PCB card content (fetched at runtime)
  assets/                    — profile photo, blog thumbnails
  favicon.svg
```

---

## Tech stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool and dev server |
| React 18 | UI framework |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Page transitions, scroll animations, expand/collapse |
| React Router 6 | Client-side routing (HashRouter for GH Pages) |
| Lucide React | Icon library |

---

## Customising content

See **ADDING-PROJECTS.md** for step-by-step instructions on adding new projects
to each section without touching component code.
