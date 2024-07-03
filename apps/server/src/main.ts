import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger.config';
import { MongooseValidationFilter } from './common/filters/mongoose-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  app.useGlobalFilters(new MongooseValidationFilter());

  const port = configService.get<number>('port') ?? 3000;
  await app.listen(port);
}
bootstrap();
