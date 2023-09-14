import { Controller, Get, Inject, Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { InteractionsService } from '../interactions/interactions.service';
import { ClientProxy, MessagePattern, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    @Inject('CONTENT_SERVICE') private readonly contentService: ClientProxy,
    private readonly interactionsService: InteractionsService
  ) {}

  @MessagePattern({ cmd: 'addInteraction' })
  async addInteraction(data: {
    userId: number;
    resourceId: number;
    type: string;
  }) {
    Logger.log('addInteraction called', 'AppController', data);
    
    const content = await this.contentService.send({ cmd: 'getContentById' }, { id: data.resourceId}).toPromise();
    if (!content) {
      return {
        status: false,
        statusCode: 400,
        content: null,
        interaction: null,
      };
    }

    return {
      status : true,
      content,
      interaction : await this.interactionsService.addInteraction({
        interactionType: data.type,
        userId: data.userId,
        resourceId: data.resourceId,
      })
    };
  }

  @MessagePattern({ cmd: 'removeInteraction' })
  async removeInteraction(data: { userId: number; resourceId: number }) {
    Logger.log('removeInteraction called', 'AppController', data);

    return await this.interactionsService.removeInteraction(
      data.userId,
      data.resourceId
    );
  }

  @MessagePattern({ cmd: 'getInteractionsCountForPost' })
  async getInteractionsCountForPost(data: { postId: number }) {
    Logger.log('getInteractionsCountForPost called', 'AppController', data);
    return await this.interactionsService.getInteractionsCountForPost(
      data.postId
    );
  }
}
