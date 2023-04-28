import { IsNotEmpty } from 'class-validator';
export class UserServiceDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly phone: string;
  password: string;
  photo: string;
}
