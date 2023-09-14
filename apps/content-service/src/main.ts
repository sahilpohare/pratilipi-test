/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule as ContentModule } from './app/content.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 5000;
  const options = {
    host: '0.0.0.0',
    port,
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
