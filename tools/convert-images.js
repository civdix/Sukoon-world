import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  path.resolve(__dirname, '../src/assests'),
  path.resolve(__dirname, '../public/images')
];

async function convertImages() {
  console.log('Starting image conversion to WebP...');
  let totalOriginal = 0;
  let totalNew = 0;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist: ${dir}`);
      continue;
    }
    
    console.log(`Processing directory: ${dir}`);
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const inputPath = path.join(dir, file);
        const name = path.basename(file, ext);
        const outputPath = path.join(dir, `${name}.webp`);
        
        try {
          const originalSize = fs.statSync(inputPath).size;
          totalOriginal += originalSize;
          console.log(`Converting: ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);
          
          await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
            
          const newSize = fs.statSync(outputPath).size;
          totalNew += newSize;
          console.log(`Success: Created ${name}.webp (${(newSize / 1024 / 1024).toFixed(2)} MB). Savings: ${((1 - newSize / originalSize) * 100).toFixed(1)}%`);
          
          // Delete original
          fs.unlinkSync(inputPath);
          console.log(`Deleted original: ${file}`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  }

  const originalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const newMB = (totalNew / 1024 / 1024).toFixed(2);
  const savings = totalOriginal ? ((1 - totalNew / totalOriginal) * 100).toFixed(1) : 0;
  console.log(`\nConversion complete!`);
  console.log(`Total original size: ${originalMB} MB`);
  console.log(`Total optimized size: ${newMB} MB`);
  console.log(`Overall savings: ${savings}%`);
}

convertImages();
