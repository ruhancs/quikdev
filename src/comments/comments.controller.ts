import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuardUser } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('api/v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiBadRequestResponse({ description: 'Data to create a post is wrong' })
  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Post(':postId')
  @UseGuards(AuthGuardUser)
  create(
    @User() user,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(user, +postId, createCommentDto);
  }

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiBadRequestResponse({ description: 'Data to create a post is wrong' })
  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Patch(':id')
  @UseGuards(AuthGuardUser)
  update(
    @User() user: any,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    console.log(user);
    console.log(user.id);
    return this.commentsService.update(user, +id, updateCommentDto);
  }

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiBadRequestResponse({ description: 'Data to create a post is wrong' })
  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Delete(':id')
  @UseGuards(AuthGuardUser)
  remove(@User() user, @Param('id') id: string) {
    return this.commentsService.remove(user, +id);
  }
}
