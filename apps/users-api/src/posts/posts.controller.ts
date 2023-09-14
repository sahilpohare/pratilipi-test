import {
  Controller,
  UseGuards,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Inject,
  Get,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../app/dtos/posts.dto';
import { GetUser } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { UploadDto } from './dtos/file-upload.dto';
import * as fs from 'fs';
import { catchError, defaultIfEmpty, first, firstValueFrom, map } from 'rxjs';

@Controller('posts')
@ApiBearerAuth('JWT')
@ApiTags('Posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(
    @Inject('CONTENT_SERVICE') private readonly contentService: ClientProxy
  ) {}

  @Get('all')
  findAll(@GetUser() user: User) {
    return this.contentService.send(
      { cmd: 'getAllContent' },
      {
        userId: user.id,
      }
    );
  }

  @Post()
  addPost(@GetUser() user, @Body() data: CreatePostDto) {
    return this.contentService.send(
      { cmd: 'addContent' },
      { ...data, userId: user.id }
    );
  }

  @Post('bulk-add')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file to upload',
    type: UploadDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully uploaded and processed the CSV file',
  })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  async bulkAdd(@GetUser() user: User, @UploadedFile() file: any) {
    const f = fs.readFileSync(file.path, 'utf8');
    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Invalid file type');
    }

    return await firstValueFrom(this.contentService.send(
      { cmd: 'bulkAdd' },
      {
        user: {
          id: user.id,
          name: user.name,
        },
        data: f,
      }
    ));
  }
}
