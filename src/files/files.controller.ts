import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { SizeValidator } from '@entities/pipes/sizeValidator.pipe';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}
  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile(SizeValidator) file: Express.Multer.File,
  ) {
    const productImg = this.filesService.uploadImage(id, file);
    return productImg;
  }
}