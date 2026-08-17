#!/usr/bin/env node
/**
 * scripts/deduplicate-shared-css.js
 *
 * Strategy 2: Parse all 8 cssHtml strings into CSS rule tokens.
 * Find rules that appear WORD-FOR-WORD across ALL 8 pages.
 * Move them to globals.css. Remove from each per-page cssHtml.
 *
 * Uses a simple character-level tokenizer — no external deps needed.
 * Safety: only removes a rule if it appears in EVERY page identically.
 *
 * Usage: node scripts/deduplicate-shared-css.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT        = path.resolve(__dirname, '..');
const GLOBALS_CSS = path.join(ROOT, 'src', 'app', 'globals.css');

const PAGE_DIRS = ['', 'about', 'services', 'process', 'portfolio', 'industries', 'insights', 'contact'];

function toKB(b) { return (b / 1024).toFixed(1) + ' KB'; }

/**
 * Very fast CSS rule splitter.
 * Splits on top-level `}` boundaries, respecting nested curly braces
 * and string literals. Returns array of trimmed rule strings.
 */
function splitCssRules(css) {
  const rules = [];
  let depth = 0;
  let inStr  = false;
  let strCh  = '';
  let start  = 0;

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];

    if (inStr) {
      if (ch === strCh && css[i - 1] !== '\\') inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; strCh = ch; continue; }
    if (ch === '{') { depth++; continue; }
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const rule = css.slice(start, i + 1).trim();
        if (rule) rules.push(rule);
        start = i + 1;
      }
    }
  }
  // Trailing text (e.g. trailing comments or whitespace)
  const tail = css.slice(start).trim();
  if (tail) rules.push(tail);

  return rules;
}

function run() {
  console.log('\n🔍  Loading CSS from all pages...\n');

  // Load all pages
  const pages = [];
  for (const pageDir of PAGE_DIRS) {
    const jsonPath = pageDir
      ? path.join(ROOT, 'src', 'app', pageDir, 'processedContent.json')
      : path.join(ROOT, 'src', 'app', 'processedContent.json');
    if (!fs.existsSync(jsonPath)) continue;
    const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const rules  = splitCssRules(parsed.cssHtml);
    pages.push({ pageDir: pageDir || 'home', jsonPath, parsed, rules });
    console.log(`  Loaded ${(pageDir || 'home').padEnd(12)}  ${rules.length} rules`);
  }

  if (pages.length === 0) { console.error('No pages found!'); process.exit(1); }

  // Build frequency map: rule -> count of pages containing it
  const freq = new Map();
  for (const { rules } of pages) {
    // Use a Set per page to avoid double-counting duplicate rules within one page
    const seen = new Set(rules);
    for (const rule of seen) {
      freq.set(rule, (freq.get(rule) || 0) + 1);
    }
  }

  // Rules that appear in ALL pages (count === pages.length) are shared
  const N = pages.length;
  const sharedRules = [];
  for (const [rule, count] of freq) {
    if (count === N) sharedRules.push(rule);
  }

  if (sharedRules.length === 0) {
    console.log('\n✅  No fully-shared rules found. CSS is already unique per page.');
    return;
  }

  const sharedSet = new Set(sharedRules);
  const sharedCss = sharedRules.join('\n');
  const sharedSize = Buffer.byteLength(sharedCss, 'utf8');

  console.log(`\n  Found ${sharedRules.length} rules shared across all ${N} pages (${toKB(sharedSize)})`);
  console.log('\n📦  Appending shared rules to globals.css...');

  // Append shared CSS to globals.css (behind a clear section comment)
  const globalsContent = fs.readFileSync(GLOBALS_CSS, 'utf8');
  const appendBlock = `\n\n/* ═══════════════════════════════════════════════════════════════════════
 * SHARED PAGE CSS — extracted from processedContent.json by
 * scripts/deduplicate-shared-css.js
 * These rules appeared identically in ALL ${N} page cssHtml strings.
 * ═══════════════════════════════════════════════════════════════════════ */\n${sharedCss}\n`;

  fs.writeFileSync(GLOBALS_CSS, globalsContent + appendBlock, 'utf8');
  console.log(`  ✅  globals.css: +${toKB(sharedSize)}`);

  // Remove shared rules from each page's cssHtml and save
  console.log('\n✂️   Removing shared rules from per-page cssHtml...\n');
  let totalSaved = 0;

  for (const { pageDir, jsonPath, parsed, rules } of pages) {
    const before    = Buffer.byteLength(JSON.stringify(parsed), 'utf8');
    const reduced   = rules.filter((r) => !sharedSet.has(r));
    parsed.cssHtml  = reduced.join('\n');
    const newJson   = JSON.stringify(parsed);
    const after     = Buffer.byteLength(newJson, 'utf8');
    const saved     = before - after;
    totalSaved     += saved;
    fs.writeFileSync(jsonPath, newJson, 'utf8');
    console.log(`  ✅  ${pageDir.padEnd(12)} ${toKB(before).padStart(9)} → ${toKB(after).padStart(9)}  saved ${toKB(saved)}`);
  }

  console.log('\n' + '─'.repeat(72));
  console.log(`  Shared rules moved to globals.css : ${sharedRules.length} rules`);
  console.log(`  Total JSON size reduction         : ${toKB(totalSaved)}`);
  console.log('─'.repeat(72) + '\n');
}

run();
