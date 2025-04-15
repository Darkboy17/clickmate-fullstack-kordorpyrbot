import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

// This controller handles the HTTP requests related to orders.
// It uses the OrdersService to perform the actual business logic.
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // This endpoint creates a new order.
  // It expects a CreateOrderDto object in the request body and returns the created Order.
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  // This endpoint retrieves all orders.
  // It returns an array of Order objects.
  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}