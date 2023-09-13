import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interaction } from './entities/interaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interaction])
  ],
  providers: [InteractionsService, Interaction],
  exports: [InteractionsService, Interaction]
})
export class InteractionsModule {}
