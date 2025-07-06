import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { Message } from './message.entity';
import { User } from 'src/users/user.entity';

type CreateMessageParams = {
  userId: number;
  content: string;
};

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createDefaultBoardForUser() {
    const board = new Board();
    return await this.boardRepository.save(board);
  }

  async createMessage({ userId, content }: CreateMessageParams) {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .innerJoin(User, 'user', 'user.board_id = board.id')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const message = new Message();
    message.content = content;
    message.board = board;

    board.messages?.push(message);
    await this.boardRepository.save(board);
    return message;
  }
}
