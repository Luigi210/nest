/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Jusan')
    .setDescription('Jusan api')
    .setVersion('1.0')
    .addTag('jusan')
    .build()

  app.enableCors({
    origin: '*',
    credentials: true,
  })
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
