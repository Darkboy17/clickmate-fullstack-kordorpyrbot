import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { SellersModule } from '../sellers/sellers.module';

// This module is responsible for managing orders in the application.
// It imports the TypeOrmModule for the Order entity and the SellersModule.
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    SellersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
})
export class OrdersModule {}