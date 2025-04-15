import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { OrdersModule } from './orders/orders.module';
import { SellersModule } from './sellers/sellers.module';
import { ChatModule } from './chat/chat.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';

// This is the main module of the application. It imports other modules and provides the necessary configuration for the application.
// The AppModule is the root module of the application, which is used to bootstrap the NestJS application.
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    OrdersModule,
    SellersModule,
    ChatModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }