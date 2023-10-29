import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/entity.auth';

dotenv.config({path: 'src/.env'})

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydb',
    entities: [AuthEntity],
    synchronize: true
  }) ,AuthModule],
})
export class AppModule {}