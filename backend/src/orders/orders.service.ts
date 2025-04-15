import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersGateway } from './orders.gateway';
import { SellersGateway } from '../sellers/sellers.gateway';

// This service handles the business logic for orders
// It interacts with the database and emits events to connected clients
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private ordersGateway: OrdersGateway,
    private sellersGateway: SellersGateway,
  ) {}

  // Create a new order and emit it to connected clients
  // Notify only connected sellers about the new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create(createOrderDto);
    const savedOrder = await this.ordersRepository.save(newOrder);

    this.sellersGateway.notifyNewOrder(savedOrder);
    
    return savedOrder;
  }

  // Find all orders and emit them to connected clients
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      order: { createdAt: 'DESC' }
    });
  }
}