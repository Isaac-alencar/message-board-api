import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { User } from 'src/users/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class SessionsService {
  private user: User | undefined;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create({
    email,
    password,
  }: CreateSessionDto): Promise<{ access_token: string }> {
    this.user = await this.usersService.findOne(email);
    const validCredentials = this.validate(password);

    if (!validCredentials) {
      throw new UnauthorizedException();
    }
    const payload = { sub: this.user.id, email: this.user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private validate(password: string): boolean {
    if (this.user) {
      return bcryptjs.compareSync(password, this.user.encryptedPassword);
    }

    return false;
  }
}
