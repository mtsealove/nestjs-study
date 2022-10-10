import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from '../boards/board.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
