import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx'))) {
      callback(fullPath);
    }
  }
}

console.log('Migrating react-helmet imports to react-helmet-async...');

let count = 0;
walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('react-helmet')) {
    // Regex matches: from "react-helmet" or from 'react-helmet' but not react-helmet-async
    const newContent = content.replace(
      /from\s+['"]react-helmet['"]/g,
      "from 'react-helmet-async'"
    );
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${path.relative(srcDir, filePath)}`);
      count++;
    }
  }
});

console.log(`Updated ${count} files.`);
