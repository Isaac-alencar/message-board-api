import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post('new')
  async create(@Body() sessionParams: CreateSessionDto) {
    return await this.sessionsService.create(sessionParams);
  }
}
