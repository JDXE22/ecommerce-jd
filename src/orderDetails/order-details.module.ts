import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { OrderDetailsController } from './order-details.controller';
import { Orders } from '@entities/orders/entities/orders.entity';
import { Products } from '@entities/products/entities/product.entity';
import { OrderDetailsService } from './order-details.service';
import { OrdersService } from '@entities/orders/orders.service';
import { UsersService } from '@entities/users/users.service';
import { ProductsService } from '@entities/products/products.service';
import { User } from '@entities/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetails, Orders, Products, User])],
    controllers: [OrderDetailsController],
    providers: [UsersService, ProductsService, OrderDetailsService, OrdersService, ],
    exports: [OrderDetailsService] 
    
})
export class OrderDetailsModule {}
