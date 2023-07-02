import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  id: number;
  userId: number;
  postId: number;
  description: string;
}
