import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: false, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
    new ParseIntIdPipe(), // Custom pipe to validate and transform 'id' parameters
  );
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
