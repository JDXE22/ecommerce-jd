import { PartialProductDto } from '@entities/orders/dto/createOrder.dto';
import { Products } from '@entities/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CategoriesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of categories must be a string and cannot be empty',
    example: 'headsets',
  })
  name: string;

  @ApiProperty({
    description: 'Must contain the product info ',
    example: [{
      name: 'SteelSeries',
      description: 'The best headset in the world',
      price: 129.99,
      stock: 12,
      category: 'headsets',
      imgUrl: 'https://example.com/images/corsairK70.jpg',
    }],
  })
  @IsArray()
  products: Products[];
}
