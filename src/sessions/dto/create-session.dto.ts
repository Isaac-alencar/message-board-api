import { IsString, IsEmail } from 'class-validator';

export class CreateSessionDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
