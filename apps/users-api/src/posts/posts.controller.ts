import {
  Controller,
  UseGuards,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Inject,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../app/dtos/posts.dto';
import { GetUser } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';

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

  @Post('')
  addPost(@GetUser() user, @Body() data: CreatePostDto) {
    return this.contentService.send(
      { cmd: 'addContent' },
      { ...data, userId: user.id }
    );
  }

  @Post('bulk-add')
  @UseInterceptors(FileInterceptor('file'))
  bulkAdd(@GetUser() user: User, @UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/csv') {
      return {
        message: 'Invalid file type',
      };
    }

    // send file to content service
    return this.contentService.send(
      { cmd: 'bulkAdd' },
      {
        user: {
          id: user.id,
          name: user.name,
        },
        data: file.buffer.toString(),
      }
    );
  }
}
