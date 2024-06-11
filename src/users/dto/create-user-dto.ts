import { isEmail, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {

  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
