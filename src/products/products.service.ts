import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './productsRepository';
import { ProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {


    constructor(private readonly productsRepository: ProductsRepository){}

    getAllProducts(page:number, limit:number){
        return this.productsRepository.getProducts(page, limit)
    }

    create(productDto: ProductDTO){
        return this.productsRepository.createProduct(productDto)
    }

    getById(id: number) {
        return this.productsRepository.getProductById(id)
    }

    deleteProduct(id:number){
        return this.productsRepository.deleteProduct(id)
    }

    updateProduct(id:number){
        return this.productsRepository.updateProduct(id)
    }
}
