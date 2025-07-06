import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersUService: UsersService) {}

  @Post('new')
  async create(@Body() userParams: CreateUserDTO): Promise<User> {
    const createdUser = await this.usersUService.create(userParams);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encryptedPassword, password, ...user } = createdUser;

    return user;
  }
}
