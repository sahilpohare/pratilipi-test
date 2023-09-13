import { Controller, Get, Logger } from '@nestjs/common';
import { InteractionsService } from '../interactions/interactions.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @MessagePattern({ cmd: 'addInteraction' })
  async addInteraction(data: { userId: number; resourceId: number; type: string }) {
    Logger.log('addInteraction called', 'AppController', data)
    
    return await this.interactionsService.addInteraction({
      interactionType: data.type,
      userId: data.userId,
      resourceId: data.resourceId
    })
  }

  @MessagePattern({ cmd: 'removeInteraction' })
  async removeInteraction(data: { userId: number; resourceId: number }) {
    Logger.log('removeInteraction called', 'AppController', data)
    
    return await this.interactionsService.removeInteraction(data.userId, data.resourceId)
  }

  @MessagePattern({ cmd: 'getInteractionsCountForPost' })
  async getInteractionsCountForPost(data: { postId: number }) {
    Logger.log('getInteractionsCountForPost called', 'AppController', data)
    
    return await this.interactionsService.getInteractionsCountForPost(data.postId)
  }
}
