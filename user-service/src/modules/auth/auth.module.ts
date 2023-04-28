import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceModule } from '../user-service/user-service.module';
import { UserServiceRepository } from '../user-service/user-service.repository';
import { UserServiceService } from '../user-service/user-service.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserServiceRepository]),
    UserServiceModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserServiceService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
