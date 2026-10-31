# aymanohm.github.io

Portfolio of Ayman Osama Hassan, built as a notebook: cream ruled pages, blue-ink notes, a stitched fabric cover.
Live at https://aymanohm.github.io.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/ and fails if any [placeholder] text would ship
npm run card:pdf   # re-renders card/business-card.pdf (needs Playwright + Chromium)
```

Pushing to `main` builds and deploys with GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Where things are

| Path | What |
|---|---|
| `src/pages/` | Home, `/work/*` case studies, `/projects`, `/about` |
| `src/data/pages.ts` | Copy for the case studies, Projects and About (verified facts; do not reword) |
| `src/styles/global.css` | Design tokens (light/dark), ruling, header, tabs, shared components |
| `src/scripts/notebook.ts` | Theme toggle, live date, draw-on-view annotations, memo number, timeline, Soual demo |
| `public/img/` | Screenshots, team photo, game clip, sticker cut-outs |
| `public/cv/` | CV PDF behind the "Download CV" button |
| `card/` | Business card: `card.html` (source), `business-card.pdf` (print, crop marks), previews |
| `docs/handoff/` | The original design handoff spec and design source files |
| `scripts/check-placeholders.mjs` | Build gate for placeholder strings |

## Rules worth keeping

- **Everything sits on the 36px ruling.** Every vertical margin, padding and line-height is a multiple of 36px.
  The handwritten name and titles are nudged onto the lines with `top: 26px - 0.2695 × font-size` (name)
  and `44px - 0.2695 × font-size` (subpage titles). Recompute if the handwriting font changes.
- **Handwriting is the voice only.** Facts, links and buttons are typed; margin notes never carry a fact alone.
- **Images only ship if the file exists.** Case-study image slots in `src/data/pages.ts` are dropped from the
  build when their file is missing, so no empty slot or placeholder text reaches production.

## To do later

- Swap the stand-in handwriting font (Nothing You Could Do) for Ayman's Calligraphr font: replace
  `public/fonts/hand.woff2`, then re-check the line math above.
- Maintenance case study: add `public/img/maintenance-summary.webp` and the slot appears automatically.
- The "Currently learning" timeline ends February 2027; update that copy after the track ends.
- Business card: request a printed proof. The smallest text (header label, "Software Engineer") prints below 7.5pt.
  If the stock is cream, ask the printer about dropping the cream fill on the back.
