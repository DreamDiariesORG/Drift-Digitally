const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name === 'processedContent.json') {
      console.log(`Processing ${fullPath}...`);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (data.bodyHtml) {
        let html = data.bodyHtml;
        
        // Remove dev attributes like x-file-name=App, x-source-editable=true, etc.
        html = html.replace(/\s+x-[a-zA-Z0-9-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?/g, '');
        
        // Remove empty class attributes
        html = html.replace(/\s+class=""/g, '');
        html = html.replace(/\s+class=''/g, '');

        data.bodyHtml = html;
        fs.writeFileSync(fullPath, JSON.stringify(data));
      }
    }
  }
}

const rootDir = path.join(__dirname, '../src/app');
processDir(rootDir);
console.log("Done.");
