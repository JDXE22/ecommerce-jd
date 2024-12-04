import { Products } from '@entities/products/entities/product.entity';
import { CloudinaryService } from '@entities/shared/cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(private readonly cloudinaryService: CloudinaryService, @InjectRepository(Products) private readonly productsRepository: Repository<Products>){}

    async uploadImage(id: string, file: Express.Multer.File){
        const fileSaved = await this.cloudinaryService.uploadImage(file)

        const product = await this.productsRepository.findOne({where: {id}})

        product.imgUrl = fileSaved.secure_url

        return this.productsRepository.save(product)

    }


}
