import { Controller, Get } from '@nestjs/common';

import { ContentService } from './content.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly contentService: ContentService) {}

  @MessagePattern({ cmd: 'bulkAdd' })
  async bulkAdd(data: {
    user: {
      id: number;
      name: string;
    };
    data: string;
  }) {
    return await this.contentService.addContentBulk(
      data.user.id,
      data.data.toString()
    );
  }

  @MessagePattern({ cmd: 'addContent' })
  async addContent(data: { userId: number; title: string; story: string }) {
    return await this.contentService.addContent(data);
  }

  @MessagePattern({ cmd: 'getAllContent' })
  async getAllContent(data: { userId: number }) {
    return await this.contentService.getAllContent(data.userId);
  }

  @MessagePattern({ cmd: 'getContentById' })
  async getContentById(data: { id: number }) {
    return await this.contentService.getContentById(data.id);
  }
}