import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Should be a valid email and unique',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password should be a not empty string',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
