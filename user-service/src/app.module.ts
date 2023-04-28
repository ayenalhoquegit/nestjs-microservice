import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { UserServiceEntity } from './modules/user-service/entities/user-service.entity';
import { UserServiceModule } from './modules/user-service/user-service.module';
import { UserServiceRepository } from './modules/user-service/user-service.repository';

@Module({
  imports: [
    UserServiceModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_api',
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
      entities: [UserServiceEntity],
    }),
    TypeOrmModule.forFeature([UserServiceRepository]),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, AppService],
})
export class AppModule {}
