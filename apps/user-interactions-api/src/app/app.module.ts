import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteractionsService } from '../interactions/interactions.service';
import { InteractionsModule } from '../interactions/interactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'user-interactions.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    InteractionsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
