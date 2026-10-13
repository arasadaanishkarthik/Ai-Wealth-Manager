import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const docsDir = path.resolve(__dirname, '../../docs');

try {
  if (fs.existsSync(distDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
    fs.mkdirSync(docsDir, { recursive: true });
    fs.cpSync(distDir, docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
    if (fs.existsSync(path.join(distDir, 'index.html'))) {
      fs.copyFileSync(path.join(distDir, 'index.html'), path.join(docsDir, '404.html'));
    }
    console.log('✓ Successfully synced build output to /docs with .nojekyll and 404.html');
  }
} catch (err) {
  console.error('Warning: could not sync to docs directory:', err.message);
}
