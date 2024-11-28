import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { UsersModule } from '@entities/users/users.module';
import { ProductsModule } from '@entities/products/products.module';
import { OrderDetailsModule } from '@entities/orderDetails/order-details.module';
import { OrderDetails } from '@entities/orderDetails/entities/orderDetails.entity';
import { UsersService } from '@entities/users/users.service';
import { ProductsService } from '@entities/products/products.service';
import { OrderDetailsService } from '@entities/orderDetails/order-details.service';
import { User } from '@entities/users/entities/user.entity';
import { Products } from '@entities/products/entities/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, User, Products])],
  providers: [OrdersService, UsersService, ProductsService, OrderDetailsService],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {}
