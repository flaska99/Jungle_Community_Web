import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

    // CORS 허용
  app.enableCors({
    origin: ['http://localhost:5176'],
    credentials: true,  // 혹시 쿠키 인증 등 쓰면 필요
  });

  // swagger 설정
  const config = new DocumentBuilder()
        .setTitle('정글 커뮤니티 API')
        .setDescription('정글 커뮤니티 백엔드 API 명세서')
        .setVersion('1.0')
        .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
