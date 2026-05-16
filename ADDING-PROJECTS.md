# Adding New Projects — Reference Guide

This document explains how to add content to each section of the portfolio
without modifying any component code.

---

## 1. Competition / Major Projects

**File:** `src/data/competitionProjects.js`

Add a new object to the `competitionProjects` array:

```js
{
  id: 'unique-kebab-id',          // used as React key — must be unique
  title: 'Project Title',
  tagline: 'One-line description shown on the collapsed card',
  description: `Multi-paragraph description.

Second paragraph here.`,          // Use \n\n to separate paragraphs
  techStack: ['React', 'ESP32', 'KiCad'],
  tags: ['Embedded', 'IoT'],      // shown as small badge chips
  year: '2025',

  // Option A — project has an external page (Devpost, GitHub, etc.)
  hasExternalPage: true,
  externalLink: 'https://devpost.com/...',
  externalLabel: 'View on Devpost',

  // Option B — no external page; card expands inline
  hasExternalPage: false,

  color: 'cyan',  // 'cyan' | 'purple' | 'green'  — card accent colour
}
```

> Cards with `hasExternalPage: false` show a chevron and expand inline on click.  
> Cards with `hasExternalPage: true` show a button linking to the external URL.

---

## 2. PCB Design

Adding a PCB takes two steps: a data file and image assets.

### Step 1 — Create the info file

Create a folder and JSON file:
```
public/pcb-data/your-pcb-slug/info.json
```

```json
{
  "header": "Board Name",
  "elevator_pitch": "One-sentence pitch shown on the collapsed card.",
  "tags": ["ESP32", "4-Layer", "Fabricated"],
  "fabricated": true,
  "description": "Full multi-paragraph description.\n\nSecond paragraph."
}
```

- Set `"fabricated": true` for physical boards (cyan accent badge).
- Set `"fabricated": false` for concept/rendered designs (purple accent badge).

### Step 2 — Add the photo captions

Open `src/data/pcbPhotoData.js` and add a new entry keyed by your slug:

```js
'your-pcb-slug': {
  photos: [
    'Caption for photo-1 (finished board)',
    'Caption for photo-2 (PCB layout)',
    'Caption for photo-3 (3D render front)',
    'Caption for photo-4 (3D render back)',
  ],
  schematic: 'Caption for schematic image',
},
```

### Step 3 — Add the images

Place images at:
```
public/pcb-data/your-pcb-slug/
  photo-1.jpg
  photo-2.jpg
  photo-3.jpg
  photo-4.jpg
  schematic.jpg
```

Missing images show a styled placeholder automatically — you can add them later.

### Step 4 — Add the slug to the grid

Open `src/components/projects/PCBGrid.jsx` and add your slug to the
appropriate array:

```js
const FABRICATED_SLUGS = [
  // ... existing slugs ...
  'your-pcb-slug',   // ← add here for a fabricated board
];

const CONCEPT_SLUGS = [
  // ... existing slugs ...
  'your-pcb-slug',   // ← or here for a concept design
];
```

---

## 3. Blog Posts

**File:** `src/data/blogPosts.js`

Add a new object to the `blogPosts` array (only include posts with 1 000+ views):

```js
{
  id: 'unique-kebab-id',
  title: 'Article Title',
  blurb: 'Two-sentence summary shown on the blog card.',
  tags: ['ESP32', 'PCB Design'],
  views: '1.5k',
  thumbnail: '/assets/blog/your-thumbnail.jpg',
  readMoreUrl: 'https://www.hackster.io/Uniostar/your-article-slug',
}
```

Then add the thumbnail image at:
```
public/assets/blog/your-thumbnail.jpg
```

Missing thumbnails show a placeholder automatically.

---

## General tips

- **Order matters** — items appear in the order listed in the data files / slug arrays.
- **Paragraph breaks** in descriptions: use `\n\n` in JSON strings or template literals in JS.
- **No rebuilding needed** — the JSON files in `public/` are fetched at runtime, so
  updating `info.json` files doesn't require a rebuild (just a browser refresh in dev).
- **Tailwind classes** — if you use a new `text-{color}` or `bg-{color}` class, make sure
  it appears in a source file so Tailwind includes it; utility classes used only in data
  files won't be included in the build.
