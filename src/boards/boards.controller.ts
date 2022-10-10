import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/createBoardDto';
import { BoardStatusPipe } from './pipes/BoardStatusPipe';
import { Board } from './board.entity';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';

@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  private logger = new Logger('board controller');
  constructor(private boardService: BoardsService) {}

  @Get()
  @ApiBearerAuth()
  getAllBoards(): Promise<Board[]> {
    this.logger.verbose('user try to read all board');
    return this.boardService.getAllBoards();
  }

  @Get('/me')
  getMine(@Req() req): Promise<Board[]> {
    const user: User = req.user;
    return this.boardService.getMine(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req,
  ): Promise<Board> {
    this.logger.verbose('new board created');
    const user: User = req.user;
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<void> {
    const user: User = req.user;
    return this.boardService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
