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
@ApiTags('Interactions')
@Controller()
export class InteractionsController {
  constructor(
    private readonly appService: AppService,
    @Inject('INTERACTIONS_SERVICE')
    private readonly interactionsService: ClientProxy,
    @Inject('CONTENT_SERVICE') private readonly contentService: ClientProxy
  ) {}

  @Post('add-interaction')
  async addLike(@GetUser() user, @Body() data: AddInteractionDto) {
    const out = await this.interactionsService
      .send({ cmd: 'addInteraction' }, { ...data, user_id: user.id })
      .toPromise() as any;
    console.log(out);
    if (!out.status) {
      throw new BadRequestException('Invalid Post Id');
    }
    return out;
  }

  @Post('posts/:postId/remove-interaction')
  async removeLike(
    @GetUser() user,
    @Param('postId') postId: number) {
    return await this.interactionsService.send(
      { cmd: 'removeInteraction' },
      {
        resource_id: postId,
        user_id: user.id
      }
    );
  }

  @Get('posts/get-interactions-count-for-post/:postId')
  getInteractionsCountForPost(@Param('postId') postId: number) {
    return this.interactionsService.send(
      { cmd: 'getInteractionsCountForPost' },
      {
        post_id: postId,
      }
    );
  }
}
