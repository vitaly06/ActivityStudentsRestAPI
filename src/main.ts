import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Сначала cookie-parser (должен быть самым первым!)
  app.use(cookieParser());

  // 2. Логирование для отладки
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Cookies:', req.cookies);
    next();
  });

  // 3. Настройка CORS (должна быть до Swagger)
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 4. Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for the application')
    .setVersion('1.0')
    .addCookieAuth('access_token') // Добавляем поддержку куков в Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
