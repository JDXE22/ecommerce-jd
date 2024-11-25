import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './productsRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])], 
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
