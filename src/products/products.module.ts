import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Categories } from '@entities/categories/entities/category.entity';
import { CategoriesService } from '@entities/categories/categories.service';
import { OrderDetailsService } from '@entities/orderDetails/order-details.service';
import { OrderDetails } from '@entities/orderDetails/entities/orderDetails.entity';
import { FilesService } from '@entities/files/files.service';
import { FilesModule } from '@entities/files/files.module';
import { CloudinaryService } from '@entities/shared/cloudinary/cloudinary.service';


@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories, OrderDetails,]), FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, OrderDetailsService],
  exports: [ProductsService],
})
export class ProductsModule {}
