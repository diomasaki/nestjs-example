import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const express = app.getHttpAdapter().getInstance()

  express.get("/", (req,res) => {
    res.json("Welcome to server side!")
  }),

  await app.listen(8800, () => {console.log("Backend Server Is Running!")});
}
bootstrap();
