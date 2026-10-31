# Handoff Spec: "Notebook" portfolio for Ayman Osama Hassan

Build target: a static site plus one business card, implemented in a fresh repo with Claude Code.
Design source: the `design-source/` folder (`.dc.html` files exported from the Design canvas). They are the
**visual and copy reference**, not production code: they use a design runtime (`support.js`, `{{holes}}`,
`<sc-for>`, `<sc-if>`) that must not ship. Rebuild in plain HTML/CSS/JS (or Astro), keeping every value in this spec.

---

## 1. Overview

A portfolio that *is* Ayman's real notebook: cream ruled pages, a printed notebook header (weekday boxes,
"Memo No.", "Date"), blue-ballpoint handwriting for his voice, and a charcoal stitched fabric cover around the page.
Primary reader: tech recruiters skimming for ~30 seconds. Secondary: engineering hiring managers reading case studies.

Priorities, in order:
1. Name, role claim and **Download CV** visible above the fold at 1440×900 and on phones.
2. Every text line sits on a ruled line (the signature craft detail; protect it).
3. One interactive demo (Soual two-lane request demo) that explains async processing to non-engineers.
4. Motion is supplementary; the page must be fully readable with motion off.

### Pages and routes
| Route | Source file | Memo No. |
|---|---|---|
| `/` Home | `Notebook.dc.html` (+ `NotebookDark`, `NotebookMobile` show dark/phone states) | 01 to 04, live by section |
| `/work/soual` | `CaseSoual.dc.html` | 05 |
| `/work/maintenance-log` | `CaseMaintenance.dc.html` | 06 |
| `/work/opengl-game` | `CaseGame.dc.html` | 07 |
| `/work/t-racers` | `CaseRacing.dc.html` | 08 |
| `/projects` | `Projects.dc.html` | 09 |
| `/about` | `About.dc.html` | 10 |
| Business card (print) | `CardCoverFront.dc.html`, `CardCoverBack.dc.html` | n/a |

Copy is authoritative in the source files. Do not reword facts; they were verified with Ayman (section 9).

---

## 2. Design tokens

Define as CSS custom properties on `:root`, overridden under `[data-theme="dark"]` and
`@media (prefers-color-scheme: dark)` when no explicit theme is stored.

### Color
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--desk` | `#2B2A2C` | `#151416` | Area around the page (the notebook cover) |
| `--desk-texture` | fabric (below) | fabric | Background-image on the desk |
| `--stitch` | `rgba(215,208,190,0.55)` | same | 2px dashed border, inset 10px, radius 16px, on the desk |
| `--page` | `#F4EEDA` | `#28272B` | Page background |
| `--rule` | `#9C978B` | `#4A4850` | Ruled lines (1px) |
| `--rule-header` | `#8F8A7E` | `#6A6870` | Header double rule |
| `--binding` | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.35)` | Left-edge shadow gradient, 0 → transparent over 30px |
| `--text` | `#25231E` | `#EEE8D8` | Headings, primary text |
| `--text-soft` | `#4B473F` | `#CCC5B4` | Body paragraphs |
| `--print` | `#6F6B62` | `#A8A396` | Printed notebook elements, meta, mono tags |
| `--ink` | `#1E2C8C` | `#AFC1FF` | Handwriting, links, annotations, primary button bg |
| `--on-ink` | `#FBF8EF` | `#1C1B1E` | Text on the ink button |
| `--tab` | `#E3DAC0` | `#34333A` | Inactive index tabs |
| `--tab-text` | `#4B473F` | `#CCC5B4` | Inactive tab label |
| `--insert` | `#FBF8EF` | `#FBF8EF` (stays light) | Taped graph-paper inserts, photo prints |
| `--insert-grid` | `#E1E6EE` | same | 18px grid on inserts |
| `--insert-ink` | `#1E2C8C` | same | Ink inside inserts (inserts are always paper) |
| `--tape` | `rgba(236,224,186,0.85)` | same | Tape strips |
| `--fail` | `#C2410C` | same | Demo failure state only |
| `--ok` | `#2F7D4F` | same | Demo completed dot only |
| `--grey-lane` | `#8A857A` | same | Demo "without a queue" lane |
| `--ink-faded` | `rgba(30,44,140,0.28)` | same | Demo stages already passed |

Optional theme lever: an orange ink (`#B53D0B` light, `#FF9A5C` dark) existed as a design tweak. Ship blue.

Fabric texture (desk, and nothing else):
```css
background-image:
  repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px),
  repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 1px, transparent 1px 3px);
```

Measured contrast (WCAG AA): ink on page 10.1:1, soft on page 8.0:1, print on page 4.57:1 (AA, just: do not lighten),
dark ink on dark page ≈8:1, button text 11:1. The ruling is decorative (2.5:1).

### Typography
| Token | Family | Use |
|---|---|---|
| `--font-hand` | `"Nothing You Could Do", cursive` (Google Fonts) | Name, section headings, margin notes, Memo No./Date values. **Stand-in**: replace with Ayman's Calligraphr font when he delivers the `.otf` (one `@font-face` change). |
| `--font-serif` | `"Newsreader", Georgia, serif` (opsz 6..72; 400, 500, 600, italic 400) | All reading text, links, buttons |
| `--font-print` | `"Fira Sans", sans-serif` (400, 500) | Printed notebook parts: header labels, weekday boxes, tabs, uppercase labels |
| `--font-mono` | `"JetBrains Mono", monospace` (400, 500) | Tech tags, meta lines, demo status, kickers |

Rule: handwriting is Ayman's *voice* only (name, headings, notes). Never use it for links, buttons or facts
that matter: those are typed. Key achievements must also appear in typed text.

The hand font lacks →, ✓ and ↑: these are drawn as inline SVG strokes (see `Arrow`, `Check`, `ArrowUp` in section 4).

### Type scale (all line-heights are multiples of the 36px ruling)
| Token | Size / line-height / weight | Where |
|---|---|---|
| `--t-name` | hand 92px / 72px (tablet 72px, phone 44px) | Home name, two lines |
| `--t-title` | hand 100px / 108px (phone: fit to width, ≤60px) | Subpage h1 |
| `--t-h2` | hand 54px / 72px (home), 50px / 72px (subpages) | Section headings |
| `--t-claim` | serif 28px / 36px / 500, `text-wrap: pretty` | Home claim |
| `--t-subtitle` | serif 30px / 36px / 500, `text-wrap: balance` | Subpage subtitle, project h3 |
| `--t-body` | serif 19px / 36px / 400 | Paragraphs |
| `--t-note` | hand 26px / 36px | Margin notes (24px in tight spots) |
| `--t-meta` | mono 13px / 36px | Meta lines, tech tags |
| `--t-label` | Fira 12px / 36px, uppercase, 0.08em tracking | Fact labels (`dt`) |
| `--t-link` | serif 17–19px / 600 | "Read the case study", typed links |

### Spacing and the ruling
| Token | Value | Notes |
|---|---|---|
| `--line` | 36px | Ruling pitch. **Every vertical margin/padding/height on the page is a multiple of this.** |
| `--rule-offset` | 26px | The ruled line sits 26px into each 36px band (1px tall) |
| `--gutter-x` | `clamp(20px, 6vw, 88px)` | Page side padding |
| `--page-max` | 1180px | Page max width |
| `--section-gap` | 108px (home), 72px (subpages) | Space before each section |

Ruling (page background):
```css
background-image:
  linear-gradient(to right, var(--binding), transparent 30px),
  repeating-linear-gradient(to bottom,
    transparent 0 26px, var(--rule) 26px 27px, transparent 27px 36px);
```
With serif 19px on a 36px line-height, the baseline lands ≈2px above the rule. This holds only if every block above
starts on a multiple of 36px measured from the page top (the header is 108px = 3 lines).

**Handwriting on the lines (the math).** For a block with line-height L and hand font size F
(font metrics: ascent 959/1024, descent 407/1024, so content height = 1.334F), the baseline sits at
`(L − 1.334F)/2 + 0.9365F` from the top of the line box. Shift the element with `position: relative; top: X` so the baseline lands on a rule:
- Home name (L = 72, block starts at page y = 180): `top = 26 − 0.2695 × F` → F=92 → 1.2px; F=44 → 14.1px.
- Subpage titles (L = 108, block starts at a multiple of 36): `top = 44 − 0.2695 × F`.
Recompute if the real Calligraphr font replaces the stand-in (read its hhea ascent/descent).

---

## 3. Layout

- **Desk:** full-viewport, `--desk` + fabric texture, padding `clamp(0,3vw,48px)` top, `clamp(0,5vw,96px)` right (room for tabs), `clamp(0,3vw,48px)` left.
  Stitch: absolutely positioned dashed border, inset 10px.
- **Page:** `max-width: 1180px`, centred, `border-radius: 4px 20px 0 0`, shadow `0 30px 60px rgba(0,0,0,.35)` (`.55` dark), `padding-bottom: 72px`.
  A black ribbon bookmark hangs from the page bottom: 22×96px, `#111012`, `left: 18%`, `bottom: -96px`, notched with `clip-path: polygon(0 0,100% 0,100% 100%,50% 84%,0 100%)`.
- **Home hero:** name spans full width (two lines, "Hassan" indented 2.2em so the "y" tail of "Ayman" doesn't hit the H). Below it, 2 columns `repeat(auto-fit, minmax(min(100%,440px),1fr))`, gap 36/64: left = claim → CTA row → short paragraph; right = Soual demo insert (rotated 0.8°).
- **Selected work rows:** grid `190px minmax(0,1fr) 230px` (≥1100), `170px minmax(0,1fr)` (760–1099, note wraps below), `1fr` (<760). Columns: meta (mono), main (h3, line, tags, "Read the case study"), margin note (hand).
- **Subpage sections:** grid `minmax(0,2fr) minmax(0,1fr)` (≥900) else `1fr`. h2 spans both columns; text left, margin note right.

---

## 4. Components

| Component | Variants / props | Notes |
|---|---|---|
| `NotebookHeader` | `memo` (string), `compact` (bool), `page` | 108px tall, sticky ≥760px. Left: theme buttons (sun, moon) and weekday boxes Mo–Su (24×18, 10px Fira) with **today ringed in ink** (irregular ellipse, `rotate(-8deg)`). Right: "Memo No." + hand value, "Date" + hand `dd / mm / yy` (live date). Bottom: double rule (1.5px + 1px). Compact (home only, after scrollY > 60): animates to 56px, keeps theme + date, hides weekdays + memo; adds a soft bottom shadow. Phones: 180px, not sticky. |
| `ThemeToggle` | light / dark | Two 44×44 buttons with 30×30 printed boxes; `aria-pressed`; selected one gets a hand-drawn check to the box's right (SVG 24×21). Persist choice in `localStorage` (try/catch). |
| `IndexTabs` | `items`, `current` | Desktop ≥1100: vertical tabs sticking out of the page's right edge (40×104, current 48px wide, page-coloured, ink text), sticky at top 132px, `writing-mode: vertical-rl`. Below 1100: a 36px strip of equal tabs under the header. Home tabs: Intro, Work, Learning, Contact, About (in-page anchors + `/about`). Subpages: Home, Work, Projects, About. `aria-current="page"` (or `"true"` for in-page section). |
| `Annotation` | `circle`, `underline`, `strike`, `bracket` | Inline SVG, `preserveAspectRatio="none"`, `vector-effect: non-scaling-stroke`, stroke 2px ink, `pathLength="1"`. Draws on first view (section 6). Strike-through uses CSS `text-decoration: line-through` (ink, 2px) for reliability. Paths are in the source (`M8 58 C 4 22, 70 6, …` etc.). |
| `MarginNote` | text, optional rotate (−1.5°) | Hand 26/36, ink, `white-space: pre-line`. Never the only place a fact appears. |
| `Insert` | graph / photo | Paper `--insert`, 18px grid (graph), shadow `0 2px 8px rgba(0,0,0,.14)`, small rotation (−1.2° to 1.2°), 1–2 tape strips (≈90×26, `--tape`, rotated ±5°). Photo variant: 10px white border, 34px bottom (Polaroid), grey placeholder until assets arrive. |
| `Arrow` / `ArrowLeft` / `ArrowUp` / `Check` | — | Hand-drawn SVG strokes, `currentColor`, 1.8px. Paths in source. |
| `Button.primary` | "Download CV (PDF)" | Ink background, `--on-ink` text, serif 19/600, min-height 52, irregular radius `255px 18px 225px 18px / 18px 225px 18px 255px`, trailing Arrow. |
| `Button.outline` | demo "Ask for 10 questions" / "Send it again" | 2px ink border, transparent, same irregular radius. |
| `Link.text` | — | Serif, ink, underline 1.5px offset 6px, min tap height 44. |
| `FactList` | `dl` of label/value (optional href) | 4 columns `auto-fit minmax(200px,1fr)`, top border 1.5px `--text`. |
| `Stats` | big (hand 56/72) + label (serif 17/36) | T-Racers results, About numbers. |
| `Chip` | tech / field | Mono 13px, ink, 1.5px ink border, radius `4px 10px 3px 8px`, height 28. |
| `Timeline` | start 2026-10-17, end 2027-02-28 | Hand-drawn wavy line; ink overlay grows to today's % (`stroke-dasharray: pct 1` on `pathLength=1`); "↑ today" marker positioned at pct. Clamp 0–1. |
| `Checklist` | topics | Hand-drawn empty boxes (17px, 1.8px ink, irregular radius, `rotate(-3deg)`). **None are ticked**: a box gets ticked only when there's a project for it. |
| `SoualDemo` | see section 5 | The only interactive widget. |
| `StickerSlot` | — | Dashed placeholder until Ayman's sticker cut-outs arrive (he made them from open-source art; OK to use). |

---

## 5. States and interactions

### SoualDemo (home hero)
Two lanes in a taped graph-paper insert. Five steps, **1700ms each**, started only by a button. Never autoplays.

| Step | Without a queue (grey lane: bar width, text) | With my pipeline (4 stage bars: API → queue → worker → AI; current = ink, passed = `--ink-faded`) |
|---|---|---|
| idle | 0%, "Press the button below to send the request." | all off, same text |
| 0 | 12%, "Sending the request." | stage 0; job `POST /generate` |
| 1 | 38%, "Waiting. The page is stuck while the server waits on the AI." | stage 1; you: "Instant reply: 'got it'. You can keep using the app."; job `202 Accepted · the job waits in the Redis queue` |
| 2 | 62%, "Still waiting. The server can't help anyone else meanwhile." | stage 3; job `Celery worker asks the AI model, 10 questions per call` |
| 3 | 86%, "Still waiting." | stage 3; job `worker saves the questions to PostgreSQL` |
| 4 | 100%, "Questions arrive, after the whole wait." | all ink, dot `--ok`; you: "Questions ready. You never stared at a spinner."; job `COMPLETED` |

**"What if the AI fails?"** (text button) runs the same with failure:
- **Lane A**, from step 2 onward: bar 62% in `--fail`, dot `--fail`, "The AI failed. Error page: you start over."
- **Lane B**:
  - **Step 2:** worker bar `--fail`; job "AI call failed · the worker retries in 30 s (3 tries max)".
  - **Step 3:** "retry worked for most · one question type still fails, logged".
  - **Step 4:** "Most questions are ready; the log says what failed."; job `COMPLETED_WITH_ERRORS`.

| Element | State | Behavior |
|---|---|---|
| Run button | after first run | Label becomes "Send it again"; clicking restarts at step 0 |
| Either button | while running | Clicking restarts cleanly (clear interval first) |
| Lane A bar | width change | `transition: width 1400ms linear` |
| Stage bars | change | `transition: background 400ms` |
| Result | step 4 | Polite live region announces "Without a queue: … With my pipeline: …" |
| Reduced motion | any run | Jump straight to step 4 |

These facts are real and must match the case study: retries 3 × 30 s, ≤10 questions per AI call, statuses PENDING → PROCESSING → COMPLETED / COMPLETED_WITH_ERRORS.

### Other elements
| Element | State | Behavior |
|---|---|---|
| Links, text | hover | Underline thickens to 2px |
| Links, text | focus-visible | 2px ink outline, 3px offset (do not remove outlines) |
| Primary button | hover | Background `color-mix(in srgb, var(--ink) 88%, black)` |
| Primary button | active | `translateY(1px)` |
| Index tab | hover | Widen to 44px |
| Index tab | current | 48px, page colour, ink text |
| Header | scrolled (home, ≥760) | Compact 56px |
| Memo No. | scroll | Shows 01–04 for the section whose top is ≤180px from the viewport top |
| Today ring / Date | load | From the visitor's clock |
| Theme | toggle | Swap tokens, no transition flash; persist |

---

## 6. Animation / motion
| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Annotations (circle, underline, bracket) | Section enters viewport (top < 80% vh), once | `stroke-dashoffset: 1 → 0` | 600–900ms, staggered delays 200–1200ms | `cubic-bezier(.6,.1,.3,1)` |
| T-Racers photo print | Work section in view, once | From `rotate(-9deg) translateY(24px)`, opacity 0 → `rotate(-3deg)`, 1 | 700ms (+300ms delay) | `cubic-bezier(.3,1.3,.5,1)` |
| Timeline progress | Learning section in view | Dash grows to today's % | 900ms (+300ms) | ease |
| Header compact | scrollY > 60 | Height 108 → 56, shadow in | 250ms | ease |
| Demo | Button | See section 5 | 1700ms/step | linear (bars) |

Use IntersectionObserver, not scroll listeners, for "in view". Under `prefers-reduced-motion: reduce`, render everything in its final state and disable transitions.

---

## 7. Responsive behavior
| Breakpoint | Changes |
|---|---|
| ≥1100 | Vertical index tabs outside the page edge; 3-column work rows; name 92px; sticky header (compacts on scroll on home) |
| 900–1099 | Tabs become a 36px strip under the header; work rows 2 columns (note wraps under); name 72px; subpage sections still 2fr/1fr |
| 760–899 | Subpage sections single column; header still sticky |
| <760 | Single column everywhere; header 180px, not sticky; name 44px; subpage title sized to fit width (≤60px); desk padding 0; demo full width; Soual architecture diagram scrolls horizontally (`min-width: 760px` inside `overflow-x: auto`) |

Never allow horizontal page scroll. Test at 390, 768, 1024, 1280 and 1440.

---

## 8. Edge cases
- **Fonts loading:** `font-display: swap`. The handwriting fallback is `cursive`; the name will reflow slightly once it loads. Preload the hand font and Newsreader 400.
- **Missing assets (current state):** CV PDF, stickers, screenshots, team photo and pinout use labelled placeholders (`[screenshot: …]`). Keep them visibly placeholder in dev; the build should fail or warn if any `[placeholder]` string ships to production.
- **Long text:** project titles wrap (never truncate). Margin notes wrap inside their column. Tags wrap.
- **Timeline before 17 Oct 2026 / after Feb 2027:** clamp the marker to 0% or 100%. After the end date, change the copy (flag to Ayman).
- **No JS:** all content readable. Demo shows its idle text plus the caption; annotations shown drawn; tabs are plain links.
- **Theme with no stored choice:** follow `prefers-color-scheme`.
- **Slow connection:** no hero images; the only heavy assets are fonts. Subset to Latin.

---

## 9. Content facts (verified with Ayman, do not change)
- **Degree:** Computer and Automatic Control Engineering, Tanta University, 2021–2026, Excellent (90%).
- **Soual:**
  - Graduation project, graded Excellent with full marks.
  - Team of 6: 2 backend (incl. Ayman), 2 AI, 1 data preprocessing, 1 frontend.
  - Ayman built the job pipeline, the Docker setup and the Railway deployment.
- **Maintenance Logging System:**
  - Aktan Misr Textile and Dyeing, Aug 2026 to now; 100 machines, 17 technicians.
  - Google Sheets + Apps Script, built with Claude Code (Ayman designed and directed it).
  - In trial alongside the paper logs.
- **T-Racers:**
  - ~63-member team, IMechE Formula Student, Silverstone, 15–19 July 2026.
  - Results: 1st Concept Class, 3rd overall, 1st overall in Project Management, 3rd Business Plan; first Egyptian team in the Business Plan final.
- **ICPC:** 3rd across Tanta University (one rank short of regionals); ECPC qualifications 34th → 22nd (2023–2025); now teaches and sets problems for the Tanta University ICPC Community.
- **NTI Professional DevSecOps:** 420 h, 17 Oct 2026 to Feb 2027. No DevSecOps skills are claimed yet.
- **Location and availability:** New Cairo, Egypt. Open to backend, software engineering, junior DevOps/DevSecOps; Greater Cairo or remote.
- **Links:**
  - Email: ayman_osama@outlook.com
  - GitHub: github.com/AymanOHM
  - LinkedIn: linkedin.com/in/aymanohm
  - Soual repo: github.com/AI-Question-Generator/grad-project-backend
  - Other repos are listed in `Projects.dc.html`.

---

## 10. Accessibility
- **Focus order:** skip link ("Skip to content") → theme buttons → tabs → main content top to bottom → footer. On home: name → claim → CV → GitHub → LinkedIn → demo buttons → work links.
- **Landmarks:** `header`, `nav` (labelled "Sections" or "Site"), `main`, `footer`. One `h1` per page; h2 per section; project titles h3.
- **ARIA:**
  - Theme buttons: `aria-label` plus `aria-pressed`.
  - Tabs: `aria-current`.
  - Decorative SVGs (rules, tape, annotations, arrows): `aria-hidden="true"`.
  - Weekday group: `aria-label="Today: <weekday>"`.
  - Demo: `figure` with `aria-label`, and a visually hidden `aria-live="polite"` region for the result only (not every step).
  - Checklist: `aria-label="Track topics, none completed yet"`.
- **Keyboard:** everything is a real `<a>` or `<button>`; no div click handlers; Enter/Space work on buttons; no keyboard traps.
- **Targets:** ≥44×44 for all interactive elements (theme buttons are 44px hit areas around 30px visuals).
- **Readability:** body never below 17px; margin notes are never the only carrier of a fact.

---

## 11. Business card (Card 1, "Cover + page")
- **Trim:** 85 × 55 mm. **Bleed:** 3 mm per side (artwork 91 × 61 mm). **Safe area:** 3 mm inside trim. Export a PDF with crop marks at 300 dpi or as vectors; fonts outlined/embedded.
- **Stock:** uncoated cream, matte. If the stock is cream, print the page side without a cream fill (let the paper be the page) and keep only the ruling and ink. Confirm with the printer.
- **Front (cover):**
  - Solid charcoal `#2B2A2C` + fabric texture.
  - Dashed stitch 1.5px `rgba(220,213,196,.75)`, inset 10px (2.7 mm) inside trim, radius 9px.
  - Name in hand font, cream `#EEE8D8`: 27px, two lines, "Hassan" indented 2.2em, bottom-left.
  - "SOFTWARE ENGINEER" in Fira 9px/500, 0.16em tracking, `#CFC8B6`.
  - No other elements.
- **Back (page):**
  - Ruling every 21px (1px `#A9A498`).
  - Header band with small caps name (Fira 8px) left and "Memo No. 01" right, over a double rule.
  - Hand "say hello" (22px, ink) on a line.
  - Contacts in serif 10.5px on four lines: email, linkedin.com/in/aymanohm, phone **[placeholder +20 1X XXXX XXXX]**, domain **[placeholder]**.
  - QR placeholder at right, 66px (≈17.5 mm). Generate the real QR to the final domain with error correction M, quiet zone 2 modules, ink colour; test-scan the printed proof.
- Minimum text ≈7.5pt: request a printed proof before the run.

---

## 12. Build and deploy notes (recommendation)
- **Stack:** Astro (or plain HTML + a small JS module per widget). Pages are static; the only JS is theme, tabs/memo observer, annotations observer and the demo.
- **Hosting:** GitHub Pages or Netlify.
- **CI (GitHub Actions):** build → HTML validation → Lighthouse CI (a11y ≥ 95) → link checker → dependency/secret scan (e.g. `npm audit`, gitleaks) → deploy. This doubles as Ayman's first DevSecOps project; add it to the "Currently learning" list as its first ticked box when done.
- **Acceptance:**
  1. Text sits on the ruling at 390/768/1440.
  2. CV button visible above the fold at 1440×900 and 390×844.
  3. Demo runs both paths and announces its result.
  4. Reduced motion shows the final states.
  5. Dark mode keeps the ruling.
  6. No horizontal scroll.
  7. Lighthouse accessibility ≥ 95.
  8. No `[placeholder]` strings in production.

## 13. Open items (owner: Ayman)
1. CV PDF.
2. Phone number and final domain (card and site).
3. Calligraphr handwriting font (`.otf`).
4. Sticker photo (to cut out) or source files.
5. Screenshots: Soual status flow and defense recording; Maintenance input form (technician names blurred) and department summary; game GIF; Silverstone team photo; pinout page (if the team allows).
