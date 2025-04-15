import { Injectable } from '@nestjs/common';

// This service is responsible for handling the main application logic.
// It provides a simple greeting message when the getHello method is called.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to QueenLive API!';
  }
}
