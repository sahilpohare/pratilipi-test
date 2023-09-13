import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { AddInteractionDto } from './dtos/interactions.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { AuthGuard } from '../guards/auth.guard';
import { GetUser } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { CreatePostDto } from './dtos/posts.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('INTERACTIONS_SERVICE')
    private readonly interactionsService: ClientProxy,
    @Inject('CONTENT_SERVICE') private readonly contentService: ClientProxy
  ) {}

  @Post('add-interaction')
  addLike(@Body() data: AddInteractionDto) {
    return this.interactionsService.send({ cmd: 'addInteraction' }, data);
  }

  @Post('posts/:postId/remove-interaction')
  removeLike(@Body() data: AddInteractionDto, @Param('postId') postId: number) {
    return this.interactionsService.send(
      { cmd: 'removeInteraction' },
      {
        ...data,
        resourceId: postId,
      }
    );
  }

  @Get('posts/get-interactions-count-for-post/:postId')
  getInteractionsCountForPost(@Param('postId') postId: number) {
    return this.interactionsService.send(
      { cmd: 'getInteractionsCountForPost' },
      {
        postId,
      }
    );
  }

  @Post('posts')
  addPost(@GetUser() user, @Body() data: CreatePostDto) {
    return this.contentService.send(
      { cmd: 'addContent' },
      { ...data, userId: user.id }
    );
  }

  @Post('posts/bulk-add')
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
