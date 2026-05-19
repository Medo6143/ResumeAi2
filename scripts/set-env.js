require('dotenv').config({ override: true });
const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, '..', 'src', 'environments');
const envFile = path.join(envDir, 'environment.ts');

// Ensure directory exists (critical for Vercel where gitignored files are absent)
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const content = `export const environment = {
    production: false,
    OPENROUTER_API_KEY: '${process.env.OPENROUTER_API_KEY || ''}',
    GOOGLE_VISION_API_KEY: '${process.env.GOOGLE_VISION_API_KEY || ''}'
};
`;

fs.writeFileSync(envFile, content);
console.log('environment.ts generated successfully.');
