import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Users } from './users';
import { BoardsService } from 'src/boards/boards.service';
import { Board } from 'src/boards/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  controllers: [UsersController],
  providers: [Users, UsersService, BoardsService],
  exports: [UsersService],
})
export class UsersModule {}
