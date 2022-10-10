import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPostDto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post, { name: 'post' })
  posts(@Args('id') id: number): Promise<Post> {
    return this.postService.findById(id);
  }

  @Query(() => [Post], { name: 'posts' })
  all(): Promise<Post[]> {
    return this.postService.getAll();
  }

  @Mutation(() => Post)
  async createPost(@Args('input') dto: CreatePostDto): Promise<Post> {
    return this.postService.createPost(dto);
  }
}
