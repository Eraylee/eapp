import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initSwagger } from './swagger/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from '@eapp/server/core/filters';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from '@eapp/server/core/interceptors';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  console.log('process.env',process.env.PORT);
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('app.PORT');
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
    })
  );
  initSwagger(app);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  return PORT;
}
bootstrap().then((port) => {
  new Logger('Nest server').log(
    `Nest server listening on http://localhost:${port}`
  );
});
