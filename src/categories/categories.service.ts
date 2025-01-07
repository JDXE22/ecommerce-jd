import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>){}

    getCategories(){
        return this.categoriesRepository.find()
    }

   async addCategories(newCategory: CategoriesDto){
        const category = await this.categoriesRepository.save(newCategory)
        return category
    }
}
