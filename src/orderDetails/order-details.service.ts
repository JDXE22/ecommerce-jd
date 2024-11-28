import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/createOrderDetail.dto';

@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async findOneBy(order: Object, relations: string[] = []){
    return await this.orderDetailsRepository.find({
        where: order,
        relations: relations
    })
  }

  async save(orderDetail: CreateOrderDetailDto) {
    return this.orderDetailsRepository.save(orderDetail)
}
}
