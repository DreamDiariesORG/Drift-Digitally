#!/usr/bin/env node
/**
 * scripts/extract-css-to-files.js
 *
 * Strategy 3: Save each page's remaining cssHtml to a static CSS file in
 * /public/styles/. Removes the cssHtml key from each JSON so the JSON payload
 * is minimal. PageShell.js will be updated separately to use <link> tags.
 *
 * Usage: node scripts/extract-css-to-files.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname, '..');
const STYLES_DIR = path.join(ROOT, 'public', 'styles');

const PAGE_MAP = [
  { dir: '',           name: 'home'       },
  { dir: 'about',      name: 'about'      },
  { dir: 'services',   name: 'services'   },
  { dir: 'process',    name: 'process'    },
  { dir: 'portfolio',  name: 'portfolio'  },
  { dir: 'industries', name: 'industries' },
  { dir: 'insights',   name: 'insights'   },
  { dir: 'contact',    name: 'contact'    },
];

function toKB(b) { return (b / 1024).toFixed(1) + ' KB'; }

function run() {
  if (!fs.existsSync(STYLES_DIR)) fs.mkdirSync(STYLES_DIR, { recursive: true });

  console.log('\n🔍  Extracting per-page CSS to /public/styles/...\n');

  let totalJsonSaved = 0;
  const manifest = {}; // name -> /styles/page-name.css

  for (const { dir, name } of PAGE_MAP) {
    const jsonPath = dir
      ? path.join(ROOT, 'src', 'app', dir, 'processedContent.json')
      : path.join(ROOT, 'src', 'app', 'processedContent.json');

    if (!fs.existsSync(jsonPath)) { console.warn(`  ⚠️  Not found: ${jsonPath}`); continue; }

    const rawJson   = fs.readFileSync(jsonPath, 'utf8');
    const before    = Buffer.byteLength(rawJson, 'utf8');
    const parsed    = JSON.parse(rawJson);
    const cssHtml   = parsed.cssHtml || '';
    const cssFile   = `page-${name}.css`;
    const cssPath   = path.join(STYLES_DIR, cssFile);
    const publicUrl = `/styles/${cssFile}`;

    // Write the CSS file
    fs.writeFileSync(cssPath, cssHtml, 'utf8');
    const cssSize = Buffer.byteLength(cssHtml, 'utf8');

    // Remove cssHtml from JSON — it's now served as a static file
    delete parsed.cssHtml;
    // Store the public URL reference so PageShell can use it
    parsed.cssUrl = publicUrl;

    const newJson = JSON.stringify(parsed);
    fs.writeFileSync(jsonPath, newJson, 'utf8');

    const after   = Buffer.byteLength(newJson, 'utf8');
    const saved   = before - after;
    totalJsonSaved += saved;

    manifest[name] = publicUrl;

    console.log(`  ✅  ${name.padEnd(12)}  JSON: ${toKB(before).padStart(9)} → ${toKB(after).padStart(9)}  (saved ${toKB(saved)})  CSS file: ${toKB(cssSize)}`);
  }

  // Write manifest so PageShell can optionally reference it
  fs.writeFileSync(
    path.join(ROOT, 'src', 'app', 'cssManifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log('\n' + '─'.repeat(72));
  console.log(`  Total JSON size saved  : ${toKB(totalJsonSaved)}`);
  console.log(`  CSS files written to   : public/styles/`);
  console.log(`  Manifest written to    : src/app/cssManifest.json`);
  console.log('─'.repeat(72) + '\n');
}

run();
