import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './utils/exceptions/custom-validator.pipe';
import { GlobalExceptionFilter } from './utils/exceptions/global-exceptions.filter';
import { ValidationInterceptor } from './utils/interceptors/validation.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ValidationInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
