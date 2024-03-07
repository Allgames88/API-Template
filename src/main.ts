import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Puerto de escucha :)
  await app.listen(3001);
  //Prefijo de la API
  app.setGlobalPrefix("api");
  // Configuración de las metal_pipe_sound.mp3
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
}
bootstrap();
