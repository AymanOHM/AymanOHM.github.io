// Layout check. Fails (exit 1) if, at any width from 360 to 1440 px:
//   - a page scrolls horizontally,
//   - the Home hero links (CV, GitHub, LinkedIn) are misaligned: on desktop their tops may differ by at most 4 px;
//     on phones the CV button must sit alone on the first row, with GitHub and LinkedIn side by side below it,
//   - on phones, the header plus the tab strip is taller than 108 px.
// Usage: node scripts/layout-check.mjs [baseUrl]
import { chromium } from 'playwright';

const base = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const widths = [360, 375, 390, 414, 480, 600, 700, 759, 760, 768, 900, 1024, 1100, 1280, 1440];
const pages = ['/', '/projects/', '/about/', '/work/soual/', '/work/maintenance-log/', '/work/opengl-game/', '/work/t-racers/'];
const failures = [];

const browser = await chromium.launch({ channel: 'chrome' });
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const r = await page.evaluate(() => {
      const box = (el) => { const b = el.getBoundingClientRect(); return { top: b.top + scrollY, left: b.left, w: b.width, h: b.height, bottom: b.bottom + scrollY }; };
      const cta = [...document.querySelectorAll('.hero__cta > *')].map(box);
      const strip = document.querySelector('.tabs-strip');
      const header = document.querySelector('.nb-header');
      return {
        hscroll: document.documentElement.scrollWidth > window.innerWidth + 1,
        cta,
        chrome: strip && getComputedStyle(strip).display !== 'none' ? Math.round(box(strip).bottom - box(header).top) : null,
      };
    });
    if (r.hscroll) failures.push(`${w}px ${path}: horizontal scroll`);
    if (path === '/' && r.cta.length === 3) {
      const [cv, gh, li] = r.cta;
      if (w >= 760) {
        const tops = [cv.top, gh.top, li.top];
        if (Math.max(...tops) - Math.min(...tops) > 4) failures.push(`${w}px /: hero link tops differ by ${(Math.max(...tops) - Math.min(...tops)).toFixed(1)}px`);
      } else {
        if (Math.abs(gh.top - li.top) > 4) failures.push(`${w}px /: GitHub and LinkedIn are not on one row`);
        if (gh.top < cv.bottom - 1) failures.push(`${w}px /: links are not below the CV button`);
        if (cv.w < (w - 2 * 20) * 0.9) failures.push(`${w}px /: CV button is not full width (${Math.round(cv.w)}px)`);
      }
    }
    if (w <= 759 && r.chrome !== null && r.chrome > 108) failures.push(`${w}px ${path}: phone chrome is ${r.chrome}px (max 108)`);
  }
  await ctx.close();
}
await browser.close();
if (failures.length) { console.log(failures.join('\n')); console.log(`\nFAIL: ${failures.length} problem(s)`); process.exit(1); }
console.log(`OK: ${widths.length} widths x ${pages.length} pages, no problems`);
