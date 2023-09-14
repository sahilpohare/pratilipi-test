import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { AddInteractionDto } from './dtos/interactions.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../decorators/user.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@Controller()
@ApiTags('Interactions')
export class InteractionsController {
  constructor(
    private readonly appService: AppService,
    @Inject('INTERACTIONS_SERVICE')
    private readonly interactionsService: ClientProxy,
    @Inject('CONTENT_SERVICE') private readonly contentService: ClientProxy
  ) {}

  @Post('add-interaction')
  async addLike(@GetUser() user, @Body() data: AddInteractionDto) {
    const out = this.interactionsService
      .send({ cmd: 'addInteraction' }, { data, userId: user.id })
      .toPromise() as any;
    if (!out.status) {
      throw new BadRequestException('Invalid Post Id');
    }
    return out;
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
}
