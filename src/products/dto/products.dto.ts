import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'Product name must be at least 5 characters long',
    example: 'Canada'
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the item',
    example: 'High-performance action camera with 5K video and advanced stabilization.'
  })
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price must be a number',
    example: 133.39
  })
  price: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Stock must be a number and cannot be empty',
    example:"stock: " + 25

  })
  stock: number;
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Product img url will have a default value if left empty',
    default: 'img/'
  })
  imgUrl: string;

}
