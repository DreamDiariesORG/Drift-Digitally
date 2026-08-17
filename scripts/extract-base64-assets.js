#!/usr/bin/env node
/**
 * scripts/extract-base64-assets.js
 *
 * Strategy 1: Extract all Base64-encoded data URLs from cssHtml in every
 * processedContent.json. Saves each unique asset as a real file in
 * /public/assets/extracted/ and rewrites the JSON with static URL paths.
 *
 * Usage: node scripts/extract-base64-assets.js
 */
'use strict';

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ROOT          = path.resolve(__dirname, '..');
const PUBLIC_DIR    = path.join(ROOT, 'public', 'assets', 'extracted');
const PUBLIC_URL_BASE = '/assets/extracted';

const PAGE_DIRS = ['', 'about', 'services', 'process', 'portfolio', 'industries', 'insights', 'contact'];

const MIME_TO_EXT = {
  'font/woff2': 'woff2', 'font/woff': 'woff', 'font/ttf': 'ttf', 'font/otf': 'otf',
  'image/webp': 'webp',  'image/png': 'png',   'image/jpeg': 'jpg', 'image/jpg': 'jpg',
  'image/gif': 'gif', 'image/svg+xml': 'svg',
};

// Matches: url("data:MIME;base64,DATA") or url('...') or url(...)
const DATA_URL_RE = /url\(["']?(data:([\w/+.\-]+);base64,([A-Za-z0-9+/=]+))["']?\)/g;

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
function hashBuf(buf) { return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8); }
function toKB(b) { return (b / 1024).toFixed(1) + ' KB'; }

function run() {
  ensureDir(PUBLIC_DIR);
  const assetCache = new Map(); // b64 -> publicUrl
  let totalBefore = 0, totalAfter = 0, totalAssets = 0;

  console.log('\n🔍  Scanning processedContent.json files...\n');

  for (const pageDir of PAGE_DIRS) {
    const jsonPath = pageDir
      ? path.join(ROOT, 'src', 'app', pageDir, 'processedContent.json')
      : path.join(ROOT, 'src', 'app', 'processedContent.json');

    if (!fs.existsSync(jsonPath)) { console.warn(`  ⚠️  Not found: ${jsonPath}`); continue; }

    const rawJson = fs.readFileSync(jsonPath, 'utf8');
    const before  = Buffer.byteLength(rawJson, 'utf8');
    totalBefore  += before;
    const parsed  = JSON.parse(rawJson);
    let cssHtml   = parsed.cssHtml;
    let replacements = 0;

    cssHtml = cssHtml.replace(DATA_URL_RE, (_full, _dataUrl, mime, b64) => {
      if (assetCache.has(b64)) { replacements++; return `url('${assetCache.get(b64)}')`; }
      const ext      = MIME_TO_EXT[mime] || (mime.split('/')[1] || 'bin');
      const buf      = Buffer.from(b64, 'base64');
      const hash     = hashBuf(buf);
      const filename = `asset-${hash}.${ext}`;
      const filePath = path.join(PUBLIC_DIR, filename);
      const pubUrl   = `${PUBLIC_URL_BASE}/${filename}`;
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, buf); totalAssets++; }
      assetCache.set(b64, pubUrl);
      replacements++;
      return `url('${pubUrl}')`;
    });

    if (replacements > 0) {
      parsed.cssHtml = cssHtml;
      const newJson  = JSON.stringify(parsed);
      fs.writeFileSync(jsonPath, newJson, 'utf8');
      const after = Buffer.byteLength(newJson, 'utf8');
      totalAfter += after;
      const label = (pageDir || 'home').padEnd(12);
      console.log(`  ✅  ${label}  ${toKB(before).padStart(9)} → ${toKB(after).padStart(9)}  saved ${toKB(before - after)}  (${replacements} replacements)`);
    } else {
      totalAfter += before;
      const label = (pageDir || 'home').padEnd(12);
      console.log(`  ℹ️   ${label}  ${toKB(before).padStart(9)}  (no data URLs found)`);
    }
  }

  console.log('\n' + '─'.repeat(72));
  console.log(`  Total before : ${toKB(totalBefore)}`);
  console.log(`  Total after  : ${toKB(totalAfter)}`);
  console.log(`  Total saved  : ${toKB(totalBefore - totalAfter)}  (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% reduction)`);
  console.log(`  Unique assets written: ${totalAssets} → public/assets/extracted/`);
  console.log('─'.repeat(72) + '\n');
}

run();
