import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Authorization } from '@entities/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}


    @Get(':id')
    @UseGuards(Authorization)
    getOrder(@Param('id') id: string ){
        return this.ordersService.getOrder(id)
    }

    @Post()
    @UseGuards(Authorization)
    addOrder(@Body() newOrder: CreateOrderDto){
        return this.ordersService.addOrder(newOrder)
    }
}
