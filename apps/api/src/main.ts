import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerUiService } from '@concepta/nestjs-swagger-ui';
import { AppModule } from './app.module';
import { ExceptionsFilter } from '@bitwild/rockets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // Swagger setup using Rockets SwaggerUiService
  const swaggerUiService = app.get(SwaggerUiService);
  swaggerUiService
    .builder()
    .setTitle('Music Management System API')
    .setDescription(
      'API for managing music collections, artists, and playlists with complete authentication',
    )
    .setVersion('1.0')
    .addBearerAuth();
  swaggerUiService.setup(app);

  const exceptionsFilter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(exceptionsFilter));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}
bootstrap();
