import { Categories } from '@entities/categories/entities/category.entity';
import { mockProducts } from '@entities/config/seeds/Archivo actividad 3';
import { mockCategories } from '@entities/config/seeds/mockCategories';
import { Products } from '@entities/products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';



@Injectable()
export class SeedCategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
    @InjectRepository(Products) private readonly productRepository: Repository<Products>,
  ) {}

  async seed() {
    const existingCategories = await this.categoryRepository.find({
      where: {name: In(mockCategories)},
    });
    

    for (const categoryName of mockCategories) {
      if (
        !existingCategories.some((category) => category.name === categoryName)
      ) {
        const category = new Categories();
        category.name = categoryName;
        await this.categoryRepository.save(category);
      }
    }
  }






}

