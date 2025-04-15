import { Module } from '@nestjs/common';
import { SellersGateway } from './sellers.gateway';

// This module is responsible for handling WebSocket connections and events related to sellers.
// It imports the SellersGateway, which manages real-time communication with sellers.
@Module({
  providers: [SellersGateway],
  exports: [SellersGateway],
})
export class SellersModule {}