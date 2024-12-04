import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

Injectable();
export class SizeValidator implements PipeTransform {
  private readonly mimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
  ];
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {    
    const maxSize = 200000;
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (!this.mimeTypes.includes(file.mimetype.split(';')[0])) {
        throw new BadRequestException('Invalid file type');
      }

    if (file.size > maxSize) {
      throw new BadRequestException('File size is too big');
    }

    return file
  }
}
