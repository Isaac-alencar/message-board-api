import * as bcrypt from 'bcryptjs';

export class Users {
  constructor(
    public readonly email: string,
    public readonly username: string,
    private readonly password: string,
    private readonly bio: string,
  ) {}

  static create(
    email: string,
    username: string,
    password: string,
    bio: string,
  ): Users {
    return new Users(email, username, password, bio);
  }

  getEncryptedPassword(): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(this.password, salt);
  }
}
