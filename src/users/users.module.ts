  import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/users/entities/user.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { OrdersModule } from '@entities/orders/orders.module';
import { OrdersService } from '@entities/orders/orders.service';
import { ProductsService } from '@entities/products/products.service';
import { OrderDetails } from '@entities/orderDetails/entities/orderDetails.entity';
import { OrderDetailsService } from '@entities/orderDetails/order-details.service';
import { Products } from '@entities/products/entities/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Orders, OrderDetails, Products])],
  providers: [UsersService, OrdersService, OrderDetailsService ,ProductsService, ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
