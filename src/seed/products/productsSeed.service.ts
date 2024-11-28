import { Categories } from '@entities/categories/entities/category.entity';
import { mockProducts } from '@entities/config/seeds/Archivo actividad 3';
import { Products } from '@entities/products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSeed {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findCategoryName(category: string) {
    const foundCategory = await this.categoriesRepository.findOne({
      where: { name: category },
    });
    if (!foundCategory) {
      throw new Error(`Category ${category} not found`);
    }

    return foundCategory;
  }
  async seed() {
    const existingProductNames = (await this.productsRepository.find()).map(
      (product) => product.name,
    );

    for (const productData of mockProducts) {
      if (!existingProductNames.includes(productData.name)) {
        const product = new Products();
        product.name = productData.name;
        product.description = productData.description;
        product.price = productData.price;
        product.stock = productData.stock;
        product.imgUrl = productData.imgUrl;
        product.category = await this.findCategoryName(productData.category);

        await this.productsRepository.save(product);
      }
    }
  }
}
