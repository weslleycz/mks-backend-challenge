import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import helmet from 'helmet';

async function bootstrap() {
  // Cria uma instância da aplicação NestJS
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(helmet());

  // Configura o middleware bodyParser para JSON e dados codificados por URL
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

  // Configura a documentação Swagger
  const options = new DocumentBuilder()
    .setTitle('MKS Backend-Challenge ')
    .setDescription('Desafio MKS')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);

  // Configura as opções de CORS
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.enableCors(corsOptions);

  // Aplica o pipe de validação globalmente
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
