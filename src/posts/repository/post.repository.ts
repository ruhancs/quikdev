import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Prisma } from '@prisma/client';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    userEmail: string,
  ): Promise<PostEntity> {
    const user = await this.dbContext.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      user: {
        connect: {
          email: userEmail,
        },
      },
    };

    return this.dbContext.post.create({
      data: data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.dbContext.post.findMany();
  }

  async postsDetails(id: number) {
    return this.dbContext.post.findUnique({
      where: {
        id: id,
      },
      include: {
        comments: {
          select: {
            description: true,
          },
        },
      },
    });
  }

  async findPostById(id: number): Promise<PostEntity> {
    return this.dbContext.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    return this.dbContext.post.update({
      where: {
        id: id,
      },
      data: updatePostDto,
    });
  }

  async addPostViews(id: number) {
    const post = await this.findPostById(id);
    return this.dbContext.post.update({
      where: {
        id: id,
      },
      data: {
        views: post.views + 1,
      },
    });
  }

  async addLike(id: number) {
    const post = await this.findPostById(id);
    return this.dbContext.post.update({
      where: {
        id: id,
      },
      data: {
        like: post.like + 1,
      },
    });
  }

  async addUnliked(id: number) {
    const post = await this.findPostById(id);
    return this.dbContext.post.update({
      where: {
        id: id,
      },
      data: {
        unliked: post.unliked + 1,
      },
    });
  }

  async addPostImage(postId: string, url: string) {
    await this.dbContext.post.update({
      where: {
        id: +postId,
      },
      data: {
        image: url,
      },
    });
  }

  async remove(id: number) {
    return this.dbContext.post.delete({
      where: {
        id: id,
      },
    });
  }
}
