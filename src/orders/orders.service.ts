import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { User } from '@entities/users/entities/user.entity';
import { Products } from '@entities/products/entities/product.entity';
import { ProductsService } from '@entities/products/products.service';
import { UsersService } from '@entities/users/users.service';
import { OrderDetails } from '@entities/orderDetails/entities/orderDetails.entity';
import { OrderDetailsService } from '@entities/orderDetails/order-details.service';
import { CreateOrderDetailDto } from '@entities/orderDetails/dto/createOrderDetail.dto';
import { PartialProductDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  findAllOrders() {
    return this.ordersRepository.find();
  }

  async getOrder(id: string) {
    const findOrder = await this.ordersRepository.findBy({ id });
    const orderDetails = await this.orderDetailsService.findOneBy(findOrder, [
      'products',
      'order',
    ]);

    return orderDetails;
  }

  async addOrder(orderDto){
    const {user, products } = orderDto
    const findUser = await this.userService.findOneUserBy(user)

    const order = new Orders()
    order.users = findUser;
    order.date = new Date()

    const newOrder = await this.ordersRepository.save(order)
    const total = await this.calculateProductsTotal(products)
    const orderDetail = new CreateOrderDetailDto()
    orderDetail.price = total
    orderDetail.products = products
    orderDetail.order = newOrder

    return await this.orderDetailsService.save(orderDetail)

 
  }

  async calculateProductsTotal(products: Array<PartialProductDto>){
    let total = 0;
    for (const product of products) {
        total += await this.productService.purchaseProduct(product.id)
    }
    return total
  }
}
