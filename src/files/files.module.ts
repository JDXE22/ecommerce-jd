import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryService } from '@entities/shared/cloudinary/cloudinary.service';
import { CloudinaryConfig } from '@entities/shared/cloudinary/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/files.entity';
import { ProductsModule } from '@entities/products/products.module';
import { Products } from '@entities/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Products])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, CloudinaryConfig]
})
export class FilesModule {}
