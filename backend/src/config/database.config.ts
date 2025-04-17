import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';

import { INestApplication, Logger } from '@nestjs/common';


// Load environment variables from .env file
config();

// Create a logger instance
const logger = new Logger('DatabaseConfig');

// Determine which environment to use
const dbEnvironment = process.env.DB_ENV?.toLowerCase() || 'local';

// Set the appropriate database configuration based on environment
let dbHost: string;
let dbUsername: string;
let dbPassword: string;

if (dbEnvironment === 'remote') {

  dbHost = process.env.REMOTE_DB_HOST || '';

  dbUsername = process.env.REMOTE_DB_USERNAME || '';

  dbPassword = process.env.REMOTE_DB_PASSWORD || '';

  logger.log('🌐 Using REMOTE database configuration');

} else {

  dbHost = process.env.LOCAL_DB_HOST || 'localhost';

  dbUsername = process.env.LOCAL_DB_USERNAME || '';

  dbPassword = process.env.LOCAL_DB_PASSWORD || '';

  logger.log('💻 Using LOCAL database configuration');

}

// Log connection attempt
logger.log(`Attempting to connect to MySQL at ${dbHost}`);


// This configuration file sets up the database connection for the application
export const databaseConfig: TypeOrmModuleOptions = {

  type: 'mysql',

  host: dbHost,

  port: parseInt(process.env.DB_PORT || '3306', 10),

  username: dbUsername,

  password: dbPassword,

  database: process.env.DB_NAME || 'queenlive',

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  synchronize: true, // Not be used in production

  timezone: 'Z', // Use UTC timezone

  logging: false,

  connectTimeout: 30000,

  retryAttempts: 5,

  retryDelay: 3000,

  autoLoadEntities: true,

};

// Function to initialize database connection with success message
export const initializeDatabase = async (app: INestApplication<any>) => {
  try {
    const connection = app.get('TypeOrmModuleOptions');
    if (connection.isConnected) {
      const dbHost = process.env.ORACLE_HOST || 'localhost';
      const dbName = 'queenlive';

      logger.log(`✅ Successfully connected to MySQL database '${dbName}' on ${dbHost}`);
      logger.log(`🔌 Connection ID: ${connection.threadId}`);

      // Log additional connection information
      const serverInfo = await connection.query('SELECT VERSION() as version');
      logger.log(`📊 MySQL Server Version: ${serverInfo[0].version}`);

      return connection;
    }
  } catch (error) {
    logger.error(`❌ Failed to connect to database: ${error.message}`, error.stack);
    throw error;
  }
};