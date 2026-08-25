# OneSIS — Marketing Website

A pixel-close Next.js rebuild of the OneSIS facility-management landing page
design, with the source design's green accent replaced by the brand color
`rgb(161, 35, 43)`.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css`)
- **next/font** — Playfair Display (serif display/italic accents) + Inter (UI/body)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires internet access on first run so
`next/font` can fetch Google Fonts and the placeholder photos (see below)
can load — both are blocked in the sandbox this was built in, but work
normally on a real machine.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx        Root layout — fonts, <html>/<body>, metadata
    page.tsx           Assembles every section in order
    globals.css         Design tokens (colors, fonts) + base styles
  components/
    ui/                 Small reusable primitives (Button, Tag, Eyebrow, TextLink, Container)
    sections/            One component per page section (Header, Hero, About, ...)
  lib/
    content.ts          ALL page copy lives here — edit text without touching components
    images.ts            Central place every image URL is defined
```

Every section of the page is its own component in `src/components/sections`,
matching the brief's request to build (and be able to revise) the page
section-by-section:

`Header -> Hero -> AnchorStrip -> About -> CoreVerticals -> StatsStrip ->
RepairAndInterior -> PropertyManagement -> FourOutcomes -> Accountability ->
WhereWeOperate -> TechPlatforms -> CTA -> Footer`

## Brand color

The one color swap requested — the source design's green (#196B3B) is now
rgb(161, 35, 43) — is wired through a single CSS variable, so it only needs
to change in one place:

```css
/* src/app/globals.css */
--color-brand: #a1232b;       /* rgb(161, 35, 43) */
--color-brand-dark: #7d1b21;  /* hover/pressed state, derive from brand */
--color-brand-tint: #f4e7e7;  /* light wash used on highlighted cards */
```

## Placeholder photography

Every photo currently comes from Lorem Picsum via `src/lib/images.ts`
(`https://picsum.photos/seed/...`) so the layout is fully functional out of
the box with zero setup. These are placeholders, not final assets — the
original design's actual photography is proprietary to that build and
wasn't reused here.

To swap in real photography, replace the values in `src/lib/images.ts` with
your own image paths (e.g. files placed in `/public/images/...`) — every
component reads from this file, so nothing else needs to change. If you
serve images from an external host instead of `/public`, add that hostname
to `images.remotePatterns` in `next.config.ts` (Picsum is already
allow-listed there as an example).

## Content

All copy — headings, stats, checklist items, card text, footer links — is
centralized in `src/lib/content.ts`. Hand this single file to anyone who
needs to update text without touching component/JSX code.

## Notes on fidelity

This rebuild reproduces the source PDF's layout, type system, spacing
rhythm, and section structure closely, based on the design at a 1920px
desktop viewport. Since the source was a single fixed-width capture,
responsive (tablet/mobile) behavior below that breakpoint was designed to
stay true to the same visual language rather than copied from a reference
(the original didn't provide one).
