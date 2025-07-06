import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBoardMessageDto } from './dto/create-message.dto';
import { BoardsService } from './boards.service';
import { JwtPayload, SessionsGuard } from 'src/sessions/sessions.guard';
import { GetUser } from 'src/users/user.decorator';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Post(':board_id/new/message')
  @UseGuards(SessionsGuard)
  async create(
    @GetUser() user: JwtPayload,
    @Body() { content }: CreateBoardMessageDto,
  ) {
    return await this.boardService.createMessage({ userId: user.sub, content });
  }
}
