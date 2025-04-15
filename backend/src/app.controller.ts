import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// This is the main controller for the application. It handles HTTP requests and responses.
// It uses the AppService to get the application logic and data.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This is a simple GET endpoint that returns a greeting message.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
