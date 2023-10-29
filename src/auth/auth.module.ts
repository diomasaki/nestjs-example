import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { verifyTokenAndAuthorization } from 'src/jwt/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entity.auth';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(verifyTokenAndAuthorization)
        .exclude({path: ':id', method: RequestMethod.PUT,},':id')
        .forRoutes(AuthController)
    }
}
