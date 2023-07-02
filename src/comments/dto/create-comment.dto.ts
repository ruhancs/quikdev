import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment description should be a not empty string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
