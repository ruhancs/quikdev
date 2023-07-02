import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentRepository } from './repository/comment.repository';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, CommentRepository],
})
export class CommentsModule {}
