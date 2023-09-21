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
    user_id: number;
    resource_id: number;
    interaction_type: string;
  }) {
    Logger.log('addInteraction called', 'AppController', data);
    console.log(">>>>> CONTROLLER",data)
    const content = await this.contentService.send({ cmd: 'getContentById' }, { id: data.resource_id}).toPromise();
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
        interaction_type: data.interaction_type,
        user_id: data.user_id,
        resource_id: data.resource_id,
      })
    };
  }

  @MessagePattern({ cmd: 'removeInteraction' })
  async removeInteraction(data: { user_id: number; resource_id: number }) {
    Logger.log('removeInteraction called', 'AppController', data);
    const out = await this.interactionsService.removeInteraction(
      data.user_id,
      data.resource_id
    );

    if (out > 0) {
      return {
        status: true
      }
    }

    return { status : false }
  }

  @MessagePattern({ cmd: 'getInteractionsCountForPost' })
  async getInteractionsCountForPost(data: { post_id: number }) {
    Logger.log('getInteractionsCountForPost called', 'AppController', data);
    return await this.interactionsService.getInteractionsCountForPost(
      data.post_id
    );
  }
}
