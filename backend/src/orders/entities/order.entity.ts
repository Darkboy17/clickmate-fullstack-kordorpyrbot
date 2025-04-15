import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

// This is the Order entity that represents the orders table in the database.
// It contains the properties of an order, such as id, productId, buyer, quantity, and createdAt.
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  buyer: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}