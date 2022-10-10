import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '게시글 내용' })
  description: string;
}
