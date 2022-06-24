import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const options = new DocumentBuilder()
  .setTitle('EAPP Server')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const initSwagger = (app: INestApplication): void => {
  const idDev = process.env.NODE_ENV === 'development';
  if (idDev) {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }
};
