import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostRepository } from './repository/post.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PostRepository, ImagesService],
})
export class PostsModule {}
