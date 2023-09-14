import { Module } from '@nestjs/common';

import { AppController } from './content.controller';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entitites/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env['POSTGRES_HOST'],
      port: parseInt(process.env['POSTGRES_PORT']),
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DB'],

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrationsTableName: 'migration',
      
      migrations: [__dirname+'**/migrations/*{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [AppController],
  providers: [ContentService],
})
export class AppModule {}
