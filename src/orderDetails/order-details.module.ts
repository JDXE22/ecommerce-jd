import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { OrderDetailsController } from './order-details.controller';
import { Orders } from '@entities/orders/entities/orders.entity';
import { Products } from '@entities/products/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetails, Orders, Products])],
    controllers: [OrderDetailsController], 
    
})
export class OrderDetailsModule {}
