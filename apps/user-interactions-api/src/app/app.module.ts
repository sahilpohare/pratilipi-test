import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteractionsService } from '../interactions/interactions.service';
import { InteractionsModule } from '../interactions/interactions.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

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
    InteractionsModule,
  ],
  providers: [
    {
      provide: 'CONTENT_SERVICE',
      useFactory: async (config: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env['CONTENT_SERVICE'].split(':')[0],
            port: parseInt(process.env['CONTENT_SERVICE'].split(':')[1]),
          },
        });
      },
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
