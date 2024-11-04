import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for global validation
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalPipes(
    new ValidationPipe({
      // this remove unnecessary/unwanted fields
      whitelist: true,
      // this throws an error if there are extra fields
      forbidNonWhitelisted: true,
      // transform the dto to plain object and field data type
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
