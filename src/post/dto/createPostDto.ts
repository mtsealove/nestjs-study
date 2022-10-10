import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  content: string;
}
