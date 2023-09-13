/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule as ContentModule } from './app/content.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // CONTENT_SERVICE 
  const contentService = process.env.CONTENT_SERVICE || 'localhost:5002';
  const options = {
    host: contentService.split(':')[0],
    port: parseInt(contentService.split(':')[1]),
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ContentModule,
    {
      transport: Transport.TCP,
      options: options,
    }
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen();
}

bootstrap();
