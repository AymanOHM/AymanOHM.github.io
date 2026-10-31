// Fails the build if any visible placeholder text would ship, e.g. "[screenshot: ...]",
// "[placeholder ...]", "[yourdomain]" or a dummy phone number like "+20 1X XXXX XXXX".
import fs from 'node:fs';
import path from 'node:path';

const dirs = process.argv.slice(2);
const files = [];
const walk = (d) => {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.html?$/.test(e.name)) files.push(p);
  }
};
dirs.forEach(walk);

const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ');
const attrText = (html) => [...html.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/gi)].map((m) => m[1]).join('\n');

const patterns = [
  /\[[^\]\n]{2,120}\]/g,          // any [bracketed note]
  /\bX{3,}\b/g,                    // XXXX dummy digits
  /\b1X\b/g,
  /\b(?:lorem ipsum|TODO|TBD)\b/gi,
];

let problems = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const text = visibleText(html) + '\n' + attrText(html);
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      problems++;
      console.error(`placeholder in ${f}: ${m[0]}`);
    }
  }
}
if (problems) {
  console.error(`\n${problems} placeholder string(s) found. Replace them or remove the slot before deploying.`);
  process.exit(1);
}
console.log(`placeholder check: ${files.length} HTML files clean`);
