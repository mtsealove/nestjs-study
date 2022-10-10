import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/createBoardDto';
import { BoardStatus } from './board.model';
import { User } from '../auth/user.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = Board.create({
      title,
      description,
      user,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
