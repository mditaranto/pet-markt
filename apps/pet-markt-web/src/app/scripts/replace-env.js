const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../apps/pet-markt-web/src/app/environments/environment.prod.ts');
const templatePath = path.resolve(__dirname, '../apps/pet-markt-web/src/app/environments/environment.prod.template.ts');

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('❌ API_URL is not defined');
  process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf-8');
content = content.replace('__API_URL__', apiUrl);

fs.writeFileSync(envPath, content);
console.log(`✅ Replaced environment.prod.ts with API_URL=${apiUrl}`);
