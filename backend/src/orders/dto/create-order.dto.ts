import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

// This DTO is used to validate the data sent to the server when creating a new order.
// It ensures that the productId, buyer, and quantity fields are present and valid.
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  buyer: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}