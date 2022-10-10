import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/setUpSwagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  logger.log('app started');
  await app.listen(3000);
}
bootstrap();
