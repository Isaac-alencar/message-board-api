import {
  Injectable,
  HttpStatus,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { BoardsService } from 'src/boards/boards.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private boardsService: BoardsService,
  ) {}

  async findOne(email: string) {
    const [user] = await this.usersRepository.find({ where: { email } });
    return user;
  }

  async create(userDTO: CreateUserDTO) {
    const { password, email, bio, username } = userDTO;

    const exists = await this.findOne(email);
    if (exists) {
      throw new ConflictException('Email is already taken');
    }

    const domainUser = Users.create(email, username, password, bio);

    const userEntity = new User();
    userEntity.email = email;
    userEntity.username = username;
    userEntity.bio = bio;
    userEntity.encryptedPassword = domainUser.getEncryptedPassword();

    // default message board
    const board = await this.boardsService.createDefaultBoardForUser();

    try {
      const user = this.usersRepository.create(userEntity);
      user.board = board;
      await this.usersRepository.save(user);

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Unexpected Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
