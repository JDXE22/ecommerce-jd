import { Products } from '@entities/products/entities/product.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'UserID must be UUID and must the a PK',
    example: '1234fs-234sd-24csfd-34sdfg',
  })
  userId: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  @ApiProperty({
    description: 'Must be a partial array of an instance of ProductDto',
    example: `  [{
    name: "Apple iPhone 15",
    description: "The latest iPhone with advanced features and sleek design.",
    price: 999.99,
    stock: 25,
    imgUrl: "https://example.com/images/iphone15.jpg"
  },]`,
  })
  products: PartialProductDto[];
}

export class PartialProductDto extends PartialType(Products) {
  products: PartialProductDto[];
}
