const fs = require('fs');
const path = require('path');

const cssToRemove = [
  '.btn-primary',
  '.btn-secondary',
  '.btn-cancel',
  '.icon-btn',
  '.table-card',
  '.table-container',
  '.table',
  '.data-table',
  '.action-menu',
  '.dropdown-menu',
  '.dropdown-item',
  '.action-item',
  '.pagination',
  '.pagination-footer',
  '.pagination-info',
  '.pagination-controls',
  '.page-btn',
  '.page-nav',
  '.page-num',
  '.modal-overlay',
  '.modal-content',
  '.modal-header',
  '.modal-body',
  '.modal-footer',
  '.close-btn',
  '.empty-state',
  '.empty-title',
  '.empty-desc',
  '.status-badge',
  '.status-published',
  '.status-draft',
  '.status-unpublished',
  '.form-group',
  '.form-control',
  '.invalid-feedback',
  '.page-container',
  '.page-header',
  '.page-title',
  '.main-content'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Extremely basic CSS parser to remove top-level blocks matching the selectors
  for (const selector of cssToRemove) {
    // Regex explanation:
    // Matches the selector, followed by optional pseudo-classes/elements and combinators,
    // up to the opening brace. Then matches everything inside non-greedily up to the closing brace.
    // Handles nested braces poorly, but our CSS is mostly flat.
    const regex = new RegExp(selector.replace(/\./g, '\\.') + '\\s*(?::[a-zA-Z-]+)?\\s*(?:,\\s*[^\\{]+)?\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regex, '');
  }

  // Also catch hover states explicitly just in case
  for (const selector of cssToRemove) {
    const regexHover = new RegExp(selector.replace(/\./g, '\\.') + ':hover\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regexHover, '');
    const regexActive = new RegExp(selector.replace(/\./g, '\\.') + '\\.active\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regexActive, '');
    const regexDisabled = new RegExp(selector.replace(/\./g, '\\.') + ':disabled\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regexDisabled, '');
    const regexInvalid = new RegExp(selector.replace(/\./g, '\\.') + '\\.is-invalid\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regexInvalid, '');
  }
  
  // Clean up multiple newlines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
    console.log('Cleaned: ' + filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.css') && !fullPath.endsWith('styles.css')) {
      processFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'src', 'app'));
