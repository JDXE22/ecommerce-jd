import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price must be number',
    example: 123.99,
  })
  price: number;
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Order must be an object containing an order ',
    example: `    
    id: uuid(),
    users: {
      id: uuid(),
      email: "john.doe@example.com",
      name: "John Doe",
    },
    date: new Date("2024-12-18T10:00:00Z"),
    orderDetails: {
      id: uuid(),
      userId: uuid()
      products: [
        {
          name: "Apple iPhone 15",
          description: "The latest iPhone with advanced features and sleek design.",
          price: 999.99,
          stock: 2,
          imgUrl: "https://example.com/images/iphone15.jpg"
        }
      ],
    }
  }`,
  })
  order: object;

  @ApiProperty({
    description: 'Products',
    example: `  products = [{
                name: "Samsung Galaxy S23",
                description: "Flagship smartphone from Samsung with cutting-edge technology.",
                price: 899.99,
                stock: 1,
                imgUrl: "https://example.com/images/galaxyS23.jpg"
              }]`,
  })
  products: Array<Object>;
}
