import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    getAllCategories(){
        return this.categoriesService.getCategories()
    }

    @Post()
    addCategories(@Body() category: Categories){
        return this.categoriesService.addCategories(category)
    }
}
