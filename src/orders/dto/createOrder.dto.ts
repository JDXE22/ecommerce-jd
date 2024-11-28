import { Products } from "@entities/products/entities/product.entity";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateOrderDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=> PartialProductDto)
    products: PartialProductDto[]
}

export class PartialProductDto extends PartialType(Products){
    products:PartialProductDto[]
}