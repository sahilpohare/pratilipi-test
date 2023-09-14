import { Module, OnModuleInit } from '@nestjs/common';

import { InteractionsController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PostsController } from '../posts/posts.controller';
import { MulterModule } from '@nestjs/platform-express';

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
    UserModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env['SECRET'],
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  controllers: [InteractionsController, PostsController],
  providers: [
    AppService,
    {
      provide: 'INTERACTIONS_SERVICE',
      useFactory: async (config : ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env['INTERACTIONS_SERVICE'].split(':')[0],
            port: parseInt(process.env['INTERACTIONS_SERVICE'].split(':')[1]),
          },
        });
      },
    },
    {
      provide: 'CONTENT_SERVICE',
      useFactory: async (config : ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env['CONTENT_SERVICE'].split(':')[0],
            port: parseInt(process.env['CONTENT_SERVICE'].split(':')[1]),
          },
        });
      },
    }
  ],
})
export class AppModule{}
