import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { CatchAllExceptionFilter } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('core/api/rest');
  app.useGlobalFilters(new CatchAllExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  const port = Number(configService.get(Env.Port)) || 3001;

  await app.listen(port, '0.0.0.0');
  console.log(`Core Service running at ${port} port`);
}
bootstrap();
