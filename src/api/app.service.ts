import { HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config/env.config';
import { configSwagger } from 'src/config/swagger-config';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

export class Application {
  static async main() {
    const app = await NestFactory.create(AppModule);
    const api = 'api/v1';
    app.setGlobalPrefix(api);
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    const documentFactory = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup(api, app, documentFactory);
    app.listen(config.port, () =>
      console.log('bu server shu portda ishlayapti', config.port),
    );
  }
}
