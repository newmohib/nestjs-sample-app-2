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
      // When enableImplicitConversion is set to true, it enables implicit type conversion for properties in your DTOs. This means that NestJS will try to automatically convert incoming values to the types defined in your DTO without requiring explicit conversion logic in your code.
      transformOptions: {
        enableImplicitConversion: true, // this will convert string to number or vse
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
