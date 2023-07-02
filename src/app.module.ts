import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule, ImagesModule, CommentsModule],
  providers: [PrismaService],
})
export class AppModule {}
