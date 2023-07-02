import { Post } from '@prisma/client';

export class PostEntity implements Post {
  like: number;
  unliked: number;
  id: number;
  userId: number;
  title: string;
  description: string;
  image: string;
  views: number;
}
