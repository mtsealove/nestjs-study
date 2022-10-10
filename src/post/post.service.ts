import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/createPostDto';
import { Board } from '../boards/board.entity';

@Injectable()
export class PostService {
  private logger = new Logger('post service');

  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  getAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findById(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    const { title, content } = dto;
    const post = Post.create({
      title,
      content,
    });
    this.logger.warn(`post ${JSON.stringify(post)}`);
    await this.postRepository.save(post);
    return post;
  }
}
