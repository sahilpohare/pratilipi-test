import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'users.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env['SECRET'],
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AppController],
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
export class AppModule {}
