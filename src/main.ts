import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for the application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Включение CORS с поддержкой куков
  app.enableCors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://your-frontend-url.com'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Разрешить отправку куков
  });

  // Использование cookie-parser
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();