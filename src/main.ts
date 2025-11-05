import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove chaves que nao estao no DTO
      forbidNonWhitelisted: true, //Levanta um erro quando a chave nao existir
      transform: false,
    }),
  );
}
bootstrap();
