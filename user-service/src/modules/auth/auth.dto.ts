import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthDto {
  @IsEmail()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
