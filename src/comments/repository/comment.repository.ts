import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    postId: number,
  ): Promise<CommentEntity> {
    return this.dbContext.comment.create({
      data: {
        ...createCommentDto,
        userId: userId,
        postId: postId,
      },
    });
  }

  async findCommentById(id: number): Promise<CommentEntity> {
    return await this.dbContext.comment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateComment(
    commentId: number,
    requestUser: any,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.dbContext.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (comment.userId !== requestUser.id) {
      throw new UnauthorizedException(
        'Only the user who made the comment can update it',
      );
    }

    return this.dbContext.comment.update({
      where: {
        id: commentId,
      },
      data: updateCommentDto,
    });
  }

  async removeComment(commentId: number, requestUser: any) {
    const comment = await this.dbContext.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    const post = await this.dbContext.post.findUnique({
      where: {
        id: comment.postId,
      },
    });

    if (comment.userId !== requestUser.id || requestUser.id !== post.userId) {
      throw new UnauthorizedException();
    }

    return this.dbContext.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
