import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Password should be a not empty string',
  })
  @IsString()
  password: string;
}
