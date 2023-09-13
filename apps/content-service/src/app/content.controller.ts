import { Controller, Get } from '@nestjs/common';

import { ContentService } from './content.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly contentService: ContentService) {}

  @MessagePattern({ cmd: 'bulkAdd' })
  async bulkAdd(userId: number, data: string) {
    return await this.contentService.addContentBulk(userId, data)
  }

  @MessagePattern({ cmd: 'addContent' })
  async addContent(data: { userId: number, title: string, story: string }) {
    return await this.contentService.addContent(data)
  }
}
