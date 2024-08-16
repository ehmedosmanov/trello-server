import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Trello Clone API')
    .setDescription(
      'API documentation for a Trello Clone task management application. This API allows users to manage boards, columns, cards, and comments with full authentication and authorization features. Utilize this documentation to interact with the endpoints for creating, updating, retrieving, and deleting resources related to project management.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT') || 8000;

  await app.listen(PORT);
}
bootstrap();
