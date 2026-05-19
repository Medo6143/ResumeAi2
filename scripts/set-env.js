require('dotenv').config({ override: true });
const fs = require('fs');

const content = `export const environment = {
    production: false,
    OPENROUTER_API_KEY: '${process.env.OPENROUTER_API_KEY}',
    GOOGLE_VISION_API_KEY: '${process.env.GOOGLE_VISION_API_KEY}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', content);
