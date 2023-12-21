import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ContactInfo } from '../contact-info/contactInfo.entity';
import { JWTStrategy } from './strategy';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ""

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactInfo, UserRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: 'access-token',
      signOptions: {
        expiresIn: "7d"
      }
    }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy,/*RefreshTokenStrategy*/],
  exports: [ JWTStrategy, PassportModule, AuthService]
})
export class AuthModule {}