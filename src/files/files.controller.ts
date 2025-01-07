import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { SizeValidator } from '@entities/pipes/sizeValidator.pipe';
import { Authorization } from '@entities/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(Authorization)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Param('id') id: string,
    @UploadedFile(SizeValidator) file: Express.Multer.File,
  ) {
    const productImg = this.filesService.uploadImage(id, file);
    try {
      return productImg;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There was an error ${error}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
