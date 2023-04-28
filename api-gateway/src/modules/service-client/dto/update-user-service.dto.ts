import { PartialType } from '@nestjs/mapped-types';
import { UserServiceDto } from './user-service.dto';

export class UpdateUserServiceDto extends PartialType(UserServiceDto) {
  id: number;
}
