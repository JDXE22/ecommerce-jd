import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>){}

    getCategories(){
        return this.categoriesRepository.find()
    }

    addCategories(newCategory: Categories){
        const category = this.categoriesRepository.save(newCategory)
        return category
    }
}
