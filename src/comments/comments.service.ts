import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repository/comment.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly emailService: MailerService,
  ) {}
  async create(
    requestUser: any,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    //await this.emailService.sendMail({
    //  subject: 'New comment',
    //  to: '',
    //  html: 'new-comment',
    //  context: { post: postId, comentario: createCommentDto.description },
    //});
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
