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
    console.log(">>>>>",createInteractionDto)
    const interaction = this.interactionRepository.create(createInteractionDto);
    return await this.interactionRepository.save(interaction);
  }

  async removeInteraction(user_id: number, resource_id: number) {
    console.log(">>>>>>>>>> REMOVE", user_id, resource_id);
    const res = await this.interactionRepository.softDelete({ user_id, resource_id });
    return res.affected;
  }

  async getInteractionsCountForPost(post_id: number) : Promise<{ likes: number; dislikes: number; }> {
    const interactions = await this.interactionRepository.find({ where: { resource_id: post_id } });
    if (!interactions) {
      return { likes: 0, dislikes: 0 };
    }

    const likes = interactions.filter(i => i.interaction_type === 'like').length;
    const dislikes = interactions.filter(i => i.interaction_type === 'dislike').length;

    return { likes, dislikes };
  }
}
