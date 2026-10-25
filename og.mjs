// Render og.png (1200×630) from copy.json + the price bars. Run with any node_modules that has sharp:
//   NODE_PATH=/path/to/node_modules node og.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const copy = JSON.parse(fs.readFileSync(new URL('./copy.json', import.meta.url)));
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// wrap h1 into lines of ~22 chars
const words = copy.h1.split(' '); const lines = []; let cur = '';
for (const w of words) { if ((cur + ' ' + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
lines.push(cur.trim());

const bars = [['Gymreapers (reference)', 29.99], ['PROMiXX single wall', 19.99], ['Boston shaker tins', 18.99], ['Cobbler shaker', 8.99], ['Restaurant-supply tins', 9.18], ['Steel shaker balls', 4.99]];
const X0 = 640, W = 500, tick = X0 + 20 / 29.99 * W;
const barSvg = bars.map(([l, p], i) => {
  const y = 150 + i * 70;
  const bw = p / 29.99 * W;
  return `<text x="${X0}" y="${y}" font-family="Helvetica, Arial" font-size="22" fill="#5d656c">${l} · $${p.toFixed(2)}</text>
  <rect x="${X0}" y="${y + 10}" width="${W}" height="22" fill="#dde2e5"/>
  <rect x="${X0}" y="${y + 10}" width="${bw}" height="22" fill="${i ? '#1f6f8b' : '#16191c'}"/>
  <rect x="${tick}" y="${y + 6}" width="3" height="30" fill="#8a2416"/>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#eef0f1"/>
  <rect y="618" width="1200" height="12" fill="#1f6f8b"/>
  <text x="60" y="90" font-family="Helvetica, Arial" font-size="22" letter-spacing="3" fill="#5d656c">A SHOPPING LOOKBOOK</text>
  ${lines.map((l, i) => `<text x="60" y="${200 + i * 74}" font-family="Georgia, serif" font-weight="bold" font-size="62" fill="#16191c">${esc(l)}</text>`).join('')}
  <text x="60" y="560" font-family="Helvetica, Arial" font-size="24" fill="#5d656c">drewhoover.com/protein-shaker-lookbook</text>
  ${barSvg}
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('./og.png', import.meta.url).pathname);
console.log('wrote og.png');
