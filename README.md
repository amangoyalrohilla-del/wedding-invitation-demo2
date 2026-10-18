# Royal Indian Wedding Invitation — React + TypeScript

A cinematic single-page wedding invitation: palace-gate opening → Shri Ganesha invocation → couple reveal → groom & bride → live countdown → Save the Date → five ceremonies → venue → gallery → film → invitation → closing blessings.

Demo couple: **Arjun Agarwal & Meera Agarwal** · 12 December 2026 · Fairmont Jaipur (fictional demo).

---

## Run it

Requires **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # type-checks, then builds to ./dist
npm run preview    # serve ./dist locally to check
```

`dist/` is a static site. Upload it to **Netlify / Vercel / GitHub Pages / Hostinger / cPanel** — any static host works. `base: './'` in `vite.config.ts` means it also works from a sub-folder.

Handy test URLs: `/?skipIntro` jumps straight to the invitation. The intro is remembered per browser session; the footer link **“Replay the royal entrance”** plays it again (useful when demoing to clients).

---

## New client in 10 minutes

Everything lives in **`src/config/weddingConfig.ts`**:

| What | Where in config |
|---|---|
| Language | every text is `{ en, hi }`; `site.defaultLanguage` picks what guests see first, the EN \| हिं button switches the whole page |
| Names, parents, blurbs | `couple.groom`, `couple.bride` |
| Ceremony date/time (IST) | `wedding.ceremonyStart / ceremonyEnd` (ISO with `+05:30`) |
| Haldi, Mehendi, Sangeet, Baraat, Wedding | `events[]` — times, dress code, copy, artwork |
| Venue | `venue.name`, `venue.address` — Maps & Calendar links are built from these automatically |
| Photos | replace the `import ... from '../assets/images/...'` lines with the client’s `.jpg/.webp` files |
| Gallery | `gallery[]` — all frames are the same 4:5 size; `focus` (e.g. `'30% 60%'`) chooses which part of a wide photo stays in frame |
| Films | `films[]` — two portrait (9:16) reels shown side by side; `mp4` (file in `public/videos/`, optional `webm`), `url`, `youtube` (`id`) or `none` |
| Music | `music.src` — leave empty for the built-in copyright-free synth drone, or a **licensed** file in `public/audio/` |
| Texts / shayari / mantra | `text` |
| Demo labels | set `site.showSampleBadge: false` for a real client |
| SEO | `site.title`, `site.description`, `site.canonicalUrl`, `public/og-image.png` (1200×630) |

Also update the `<title>`, description and `og:*` tags in `index.html` (link-preview bots don’t run JavaScript).

### Photo sizes that look best
- Couple hero: portrait **4:5** (e.g. 1600×2000)
- Groom / Bride: portrait **3:4** (1200×1600), subject centred — the jharokha arch crops the top corners
- Ceremony panels: landscape **10:7**
- Venue: landscape **16:11**
- Gallery: portrait 4:5 works best (any size is cropped to the same frame)
- Films: portrait 9:16 (phone video), H.264 MP4
Use `.webp` or quality-80 `.jpg`, ideally under 400 KB each.

---

## How the key features work

- **Gate** – an ornate palace gate (dome, pillars, carved doors, A&M seal). Tap *Open the Invitation*: the doors swing open in 3D, golden light pours out and the view moves through the gate. Double taps are ignored. Reduced-motion users get a simple fade.
- **Ganesha scene** – glow → arch unfolds → deity rises softly → invocation & mantra → auto-continues (about 4 seconds after the doors open). *Skip Intro* is always visible.
- **Save the Date** – opens Google Calendar’s real *create event* screen, prefilled with title, venue, description, start/end and `ctz=Asia/Kolkata`. Outlook.com and Microsoft 365 links are in a small secondary menu. Nothing is downloaded; nothing claims to be “added” until the guest saves it.
- **Maps** – `google.com/maps/dir/?api=1&destination=…` and `…/search/?api=1&query=…` (no API key). On phones these open the Google Maps app.
- **Countdown** – ticks every second against `2026-12-12T19:30+05:30`, tabular numbers, never negative; after the ceremony it shows “Celebrating Our Forever Love”.
- **Gallery** – lightbox with arrow keys, swipe, Escape/close; reference-counted scroll lock so the page never stays stuck.
- **Film** – modal player with controls; no autoplay with sound before the guest taps Play; ambience pauses while the film plays.
- **Sound** – off by default. Enabled only by an explicit tap; never restarts between sections.

## Project structure

```
src/
  App.tsx                 intro phases + page order
  main.tsx
  config/weddingConfig.ts ← edit this for each client
  components/
    RoyalGate.tsx  GaneshWelcome.tsx  CoupleHero.tsx
    GroomSection.tsx  BrideSection.tsx  ProfileSection.tsx (shared frame)
    Countdown.tsx  SaveTheDate.tsx  WeddingFunctions.tsx
    VenueSection.tsx  PhotoGallery.tsx  VideoSection.tsx
    InvitationMessage.tsx  FinalBlessings.tsx
    PremiumButton.tsx  Navigation.tsx  Modal.tsx
    Ornaments.tsx (Ganesha emblem, mandala, frames, petals)  Icons.tsx
  lib/  links.ts (calendar/maps)  weddingLinks.ts  hooks.ts  dom.ts  audio.ts
  styles/globals.css      tokens, layout, animations, responsive, reduced-motion
  assets/images/          demo artwork (SVG)
public/  og-image.png  favicon.svg  videos/
```

## Notes on the stack

- React 19 + TypeScript + Vite. Styling is hand-written CSS with design tokens (no Tailwind), motion is CSS transitions/keyframes + IntersectionObserver (no Framer Motion), icons are inlined Lucide-style SVGs. This keeps the bundle small (~80 KB gzipped JS) and smooth on mid-range Android. You can add Tailwind/Framer Motion later without changing the structure.
- Fonts: Cormorant Garamond, Great Vibes (names), Manrope, Noto Serif Devanagari — loaded from Google Fonts with `display=swap`.

## Demo content disclaimer

The couple, parents and artwork are fictional. The images are original illustrated artwork (silhouettes), **not photographs** — replace them with the client’s own photos. The two sample films are slideshows of that artwork with a synthesised tanpura drone. The venue illustration is generic, not the actual hotel.
