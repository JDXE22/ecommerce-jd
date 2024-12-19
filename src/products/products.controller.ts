import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './dto/products.dto';
import { Authorization } from 'src/guards/auth.guard';
import { Products } from './entities/product.entity';
import { RolesGuard } from '@entities/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
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
  
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(Authorization, RolesGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body()product: Products) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct((id));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.getById((id));
  }


}
