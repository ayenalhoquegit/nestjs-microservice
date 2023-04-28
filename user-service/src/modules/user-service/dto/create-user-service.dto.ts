import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserServiceDto {
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly phone: string;
  password: string;
  photo: string;
}
