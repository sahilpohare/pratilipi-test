import { Injectable, Logger } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interaction } from './entities/interaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) { }
  
  async addInteraction(createInteractionDto: CreateInteractionDto) {
    const interaction = this.interactionRepository.create(createInteractionDto);
    return await this.interactionRepository.save(interaction);
  }

  async removeInteraction(userId: number, resourceId: number) {
    const res = await this.interactionRepository.softDelete({ userId, resourceId });
    return res.affected;
  }

  async getInteractionsCountForPost(postId: number) : Promise<{ likes: number; dislikes: number; }> {
    const interactions = await this.interactionRepository.find({ where: { resourceId: postId } });
    if (!interactions) {
      return { likes: 0, dislikes: 0 };
    }

    const likes = interactions.filter(i => i.interactionType === 'like').length;
    const dislikes = interactions.filter(i => i.interactionType === 'dislike').length;

    return { likes, dislikes };
  }
}
