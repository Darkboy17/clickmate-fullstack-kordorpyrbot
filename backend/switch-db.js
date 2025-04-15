// switch-db.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load current .env file
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

// Get the environment from command line argument
const args = process.argv.slice(2);
const targetEnv = args[0]?.toLowerCase();

if (!targetEnv || (targetEnv !== 'local' && targetEnv !== 'remote')) {
  console.error('❌ Please specify either "local" or "remote" as an argument');
  console.log('Example: node switch-db.js local');
  process.exit(1);
}

// Update the DB_ENV value
envConfig.DB_ENV = targetEnv;

// Convert the config object back to a string
const newEnvContent = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

// Write the updated content back to the .env file
fs.writeFileSync(envPath, newEnvContent);

console.log(`✅ Successfully switched to ${targetEnv.toUpperCase()} database environment`);
console.log(`🔄 Restart your application for changes to take effect`);