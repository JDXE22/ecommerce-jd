import { Products } from "@entities/products/entities/product.entity";
import { PartialType } from "@nestjs/mapped-types";

export class CreateOrderDto {

    userId: string;
    products: PartialProductDto[]
}

export class PartialProductDto extends PartialType(Products){
    products:PartialProductDto[]
}