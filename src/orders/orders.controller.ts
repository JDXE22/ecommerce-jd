import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Authorization } from '@entities/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}


    @Get(':id')
    @UseGuards(Authorization)
    getOrder(@Param('id') id: string ){
        try {
            return this.ordersService.getOrder(id)
        } catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.NOT_FOUND,
                  error: `Order with id ${id} was not found`
                },
                HttpStatus.NOT_FOUND,
              );
        }
    }

    @Post()
    @UseGuards(Authorization)
    addOrder(@Body() newOrder: CreateOrderDto){
        try {
            return this.ordersService.addOrder(newOrder)
        } catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: `The issue is related to ${error}`
                },
                HttpStatus.BAD_REQUEST,
              );
        }
    }
}
