import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getAllProducts(page: number, limit: number) {
    console.log(`Fetching products: page ${page}, limit ${limit}`);
    return await this.productsRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async create(productDto: Products): Promise<ProductDTO> {
    return this.productsRepository.save(productDto);
  }

  async getById(id: string) {
    return this.productsRepository.findBy({ id });
  }

  async deleteProduct(id: string) {
     this.productsRepository.delete(id);
     return {id}
  }

  async updateProduct(id: string, updatedProduct: Products) {
    await this.productsRepository.update(id, updatedProduct);
    return this.productsRepository.findOneBy({ id });
  }

  async purchaseProduct(id: string) {
    const productId = await this.productsRepository.findOneBy({ id });
    if (productId.stock === 0) {
      throw new Error('out of stock');
    }
    await this.productsRepository.update(id, {
      stock: productId.stock - 1,
    });
    console.log('Product bought successfully ');
    return productId.price;
  }
}
