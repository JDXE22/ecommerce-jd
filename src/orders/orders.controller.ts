import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}


    @Get(':id')
    getOrder(@Param('id') id: string ){
        return this.ordersService.getOrder(id)
    }

    @Post()
    addOrder(@Body() newOrder: CreateOrderDto){
        return this.ordersService.addOrder(newOrder)
    }
}
