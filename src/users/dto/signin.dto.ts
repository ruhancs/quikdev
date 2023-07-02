import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    description: 'Should be a valid email and unique',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password should be the same of the signup',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
