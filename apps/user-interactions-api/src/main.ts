/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 5000;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port },
    }
  );
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.listen().then(() => {
    Logger.log(`🚀 Application is running on: ${port}`);
  })
}

bootstrap();
