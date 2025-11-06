# Atmosphere Music Rating

A Vite + React playground for cataloguing Atmosphere's discography, rating tracks, and curating favourites. Ratings live in `localStorage`, so you can tweak the dataset without a backend.

## Getting Started

```bash
npm install
npm run dev
```

Open the dev URL printed in the terminal. The same build can be hosted on Vercel or any static host via `npm run build`.

## Features

- **Album browser** – browse studio albums, EPs, and compilations with automatic cover art. Bundled artwork renders immediately while a background fetch attempts to enhance quality.
- **Track ratings** – rate each song from 0.5 to 5 stars (half-star increments) with progress indicators per album.
- **Search & filtering** – search across albums and songs, filter albums by rating tier, or jump directly to song matches ready for rating.
- **Top tracks view** – dedicated page that sorts your highest-rated songs for quick listening sessions.
- **Favourites** – heart icon toggles build a favourites list and surface counts on album cards.
- **Album detail pages** – tracklists, quick stats, streaming links, wiki summaries, and a highlight of your top-rated tracks for that album.

## Data & Customisation

- Album metadata and tracklists live in `src/data/bandData.js` and `src/data/tracks.js`. Add releases or tweak songs as needed.
- If you add bundled artwork, drop the image into `public/album-covers/` and reference it via the `cover` field (see existing entries).
- Remote artwork logic resides in `src/utils/fetchAlbumArt.js` if you want to point at a different provider.

## Development Notes

- Built with Vite, React 18, and Tailwind utilities.
- Ratings, favourites, and progress bars derive from `localStorage`. Clearing site storage resets the app.
- No backend is required; everything runs locally or on static hosting.

Enjoy exploring Atmosphere’s catalogue—PRs and remix ideas welcome!
