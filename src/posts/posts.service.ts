import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repository/post.repository';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}
  create(requestUser: any, createPostDto: CreatePostDto) {
    return this.postRepository.create(createPostDto, requestUser.email);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }

  async postsDetails(id: number) {
    const postDetailed = await this.postRepository.postsDetails(id);

    if (!postDetailed) {
      throw new NotFoundException('Post not found');
    }

    return {
      title: postDetailed.title,
      views: postDetailed.views,
      likes: postDetailed.like,
      unlikes: postDetailed.unliked,
      comments: postDetailed.comments.length,
    };
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.postRepository.addPostViews(id);

    return post;
  }

  async likePost(id: number) {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.addLike(id);
  }

  async unlikePost(id: number) {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.addUnliked(id);
  }

  async update(requestUser: any, id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post with this id does not exist');
    }
    if (requestUser.id !== post.userId) {
      throw new UnauthorizedException();
    }
    return this.postRepository.updatePost(id, updatePostDto);
  }

  async insertImageUrl(postId: string, url: string) {
    const post = await this.postRepository.findPostById(+postId);
    if (!post) {
      throw new NotFoundException('Post with this id does not exist');
    }
    return this.postRepository.addPostImage(postId, url);
  }

  async remove(requestUser: any, id: number) {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post with this id does not exist');
    }
    if (requestUser.id !== post.userId) {
      throw new UnauthorizedException();
    }
    return this.postRepository.remove(id);
  }
}
