// Full-page screenshots of every page at 3 widths, light and dark.
// Usage: node scripts/shots.mjs <phase> [baseUrl]
// Example: node scripts/shots.mjs 0-baseline http://localhost:4321
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const phase = process.argv[2];
const base = (process.argv[3] || 'http://localhost:4321').replace(/\/$/, '');
if (!phase) {
  console.error('usage: node scripts/shots.mjs <phase> [baseUrl]');
  process.exit(1);
}

const pages = [
  ['home', '/'],
  ['projects', '/projects/'],
  ['about', '/about/'],
  ['soual', '/work/soual/'],
  ['maintenance', '/work/maintenance-log/'],
  ['game', '/work/opengl-game/'],
  ['tracers', '/work/t-racers/'],
];
const sizes = [
  [390, 844],
  [768, 1024],
  [1440, 900],
];
const themes = ['light', 'dark'];

const outDir = `review-shots/${phase}`;
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
let count = 0;
for (const theme of themes) {
  for (const [w, h] of sizes) {
    const context = await browser.newContext({
      viewport: { width: w, height: h },
      colorScheme: theme,
      reducedMotion: 'reduce',
    });
    // The site reads its theme from localStorage before first paint.
    await context.addInitScript((t) => {
      try { localStorage.setItem('theme', t); } catch {}
    }, theme);
    const page = await context.newPage();
    for (const [name, path] of pages) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Lazy images below the fold never load in a full-page capture, so load them first.
      await page.evaluate(async () => {
        const imgs = [...document.images];
        imgs.forEach((i) => { i.loading = 'eager'; });
        await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
      });
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${outDir}/${name}-${w}-${theme}.png`, fullPage: true });
      count++;
    }
    await context.close();
  }
}
await browser.close();
console.log(`${count} screenshots in ${outDir}/`);
