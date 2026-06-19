# Rhythm

A music browsing web app built with Next.js 15 and React 19.

## Features

- **Landing page** — hero section, top songs, and genre tags
- **Browse page** — album grid with genre filtering
- **Album page** — track listing with play and like actions
- **Player bar** — persistent playback bar across all pages
- **Like tracks** — toggle liked state, persisted via React context

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- TypeScript
- CSS Modules with a custom design system

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js routes (layout, page, /browse, /album/[id])
├── entities/         # Core data types and fixtures (album, track)
├── features/         # User interactions (play-track, like-track)
├── widgets/          # Composed UI sections (header, hero, player-bar, …)
├── page-views/       # Full page components assembled from widgets
└── shared/           # Design system — UI primitives and global styles
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
