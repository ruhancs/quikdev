import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}
  create(requestUser: any, postId: number, createCommentDto: CreateCommentDto) {
    return this.commentRepository.create(
      createCommentDto,
      +requestUser.id,
      +postId,
    );
  }

  async update(
    requestUser: any,
    id: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentRepository.findCommentById(id);

    if (!comment) {
      throw new NotFoundException('Comment with this id does not exist');
    }

    return this.commentRepository.updateComment(
      id,
      requestUser,
      updateCommentDto,
    );
  }

  async remove(requestUser: any, id: number) {
    const comment = await this.commentRepository.findCommentById(id);

    if (!comment) {
      throw new NotFoundException('Comment with this id does not exist');
    }
    return this.commentRepository.removeComment(id, requestUser);
  }
}
