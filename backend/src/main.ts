import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeDatabase } from './config/database.config';

async function bootstrap() {

  // Create a new NestJS application instance using the AppModule as the root module.
  // The AppModule is the main module of the application, which imports other modules and provides the necessary configuration.
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'https://clickmate-fullstack-kordorpyrbot.vercel.app', 'https://clickmate-fullstack-kordorpyrbot-git-master-darkboy17s-projects.vercel.app', 'https://clickmate-fullstack-kordorpyrbot-p6opqo1zs-darkboy17s-projects.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Initialize database and log connection status

  await initializeDatabase(app);

  // Default to 3000 if PORT is not set in the environment variables.
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
