import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './users/common/guards/error.handlers/error.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.useGlobalFilters(new HttpExceptionFilter()); // if more filters are needed inject via the providers in app module
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(3500);

  // WebPack settings
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
