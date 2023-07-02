import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title should be a not empty string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Post description should be a not empty string',
  })
  @IsString()
  description: string;
}
