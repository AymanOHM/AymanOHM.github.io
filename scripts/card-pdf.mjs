// Renders card/card.html to card/business-card.pdf (2 pages, 101 x 71 mm with crop marks)
// and card/preview-*.png. Fonts are embedded by Chromium. Run: npm run card:pdf
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const html = pathToFileURL(path.resolve('card/card.html')).href;
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 4 });
await page.goto(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: 'card/business-card.pdf', width: '101mm', height: '71mm', printBackground: true, preferCSSPageSize: true });
const sheets = await page.$$('.sheet');
for (const [i, s] of sheets.entries()) await s.screenshot({ path: `card/preview-${i ? 'back' : 'front'}.png` });
await browser.close();
console.log('wrote card/business-card.pdf and previews');
