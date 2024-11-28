import { Module } from '@nestjs/common';
import { SeedCategoriesService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '@entities/categories/entities/category.entity';
import { Products } from '@entities/products/entities/product.entity';
import { ProductsSeed } from './products/productsSeed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products])],
  providers: [SeedCategoriesService, ProductsSeed],
  exports: [SeedCategoriesService, ProductsSeed]
})
export class SeedModule {}
