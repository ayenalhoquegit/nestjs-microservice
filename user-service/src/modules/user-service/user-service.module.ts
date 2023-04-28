import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceController } from './user-service.controller';
import { UserServiceRepository } from './user-service.repository';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserServiceRepository])],
  controllers: [UserServiceController],
  providers: [UserServiceService, UserServiceRepository],
})
export class UserServiceModule {}
