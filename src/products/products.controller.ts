import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './dto/products.dto';
import { Authorization } from 'src/guards/auth.guard';
import { Products } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const products = this.productsService.getAllProducts(page, limit)
    if (!products) {
      throw new HttpException('There are no products', HttpStatus.NOT_FOUND);
    }
    return products;
  }

  @Post()
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() product: Products) {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  updateProduct(@Param('id') id: string, @Body()product: Products) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct((id));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id') id: string) {
    return this.productsService.getById((id));
  }


}
