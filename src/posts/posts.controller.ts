import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuardUser } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { join } from 'path';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('api/v1/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly imageService: ImagesService,
  ) {}

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiBadRequestResponse({ description: 'Data to create a post is wrong' })
  @Post()
  @UseGuards(AuthGuardUser)
  create(@User() user: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Get(':id/post-info')
  postInfo(@Param('id') id: string) {
    return this.postsService.postsDetails(+id);
  }

  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Get(':id/like')
  likePost(@Param('id') id: string) {
    return this.postsService.likePost(+id);
  }

  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Get(':id/unliked')
  unlikedPost(@Param('id') id: string) {
    return this.postsService.unlikePost(+id);
  }

  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @ApiBadRequestResponse({ description: 'Data to create a post is wrong' })
  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @Patch(':id')
  @UseGuards(AuthGuardUser)
  update(
    @User() user,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(user, +id, updatePostDto);
  }

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiNotFoundResponse({ description: 'Post with this id does not exist' })
  @Delete(':id')
  @UseGuards(AuthGuardUser)
  remove(@User() user, @Param('id') id: string) {
    return this.postsService.remove(user, +id);
  }

  @ApiForbiddenResponse({ description: 'Insert a valid token on header' })
  @ApiBody({
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuardUser)
  async uploadFile(
    @User() user: any,
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),

          //await to enter maximum file size
          // new MaxFileSizeValidator({maxSize: 1024 * 30})
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      `${user.email}${id}.${file.mimetype.split('/')[1]}`,
    );
    try {
      await this.imageService.uploadedImage(file, path);
      await this.postsService.insertImageUrl(id, path, user);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { success: true, message: 'Insert image in post successfuly' };
  }
}
