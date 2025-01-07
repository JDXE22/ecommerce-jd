import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesDto } from './dto/categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    getAllCategories(){
        try {
            return this.categoriesService.getCategories()
        } catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.NOT_FOUND,
                  error: `No categories were found`
                },
                HttpStatus.NOT_FOUND,
              );
        }
    }

    @Post()
    addCategories(@Body() CategoriesDto: CategoriesDto){
        try {
            return this.categoriesService.addCategories(CategoriesDto)
        } catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.NOT_FOUND,
                  error: `The categories could not be uploaded`
                },
                HttpStatus.NOT_FOUND,
              );
        }
    }
}
