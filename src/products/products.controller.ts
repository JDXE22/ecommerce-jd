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
 try {
  const products = this.productsService.getAllProducts(page, limit)
  if (!products) {
    throw new HttpException('There are no products', HttpStatus.NOT_FOUND);
  }
  return products;
 } catch (error) {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: 'Products not found'
    },
    HttpStatus.NOT_FOUND
  );
 }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() product: ProductDTO) {
    try {
      return this.productsService.create(product);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Wrong product info'
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(Authorization, RolesGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body()product: Products) {
    try {
      return this.productsService.updateProduct(id, product);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Product with id:${id} was not found`
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
   try {
    return this.productsService.deleteProduct((id));
   } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Product with id:${id} was not found`
      },
      HttpStatus.NOT_FOUND,
    );
   }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id',ParseUUIDPipe) id: string) {
    try {
      return this.productsService.getById((id));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Product with id ${id} was not found`
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }


}
