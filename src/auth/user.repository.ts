import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/authCredentialDto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialDto): Promise<User> {
    const { username, password } = dto;
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(password, salt);
    console.log(hashedPw);
    const user = User.create({ username, password: hashedPw });
    try {
      await this.save(user);
    } catch (e) {
      if (e.errno === 1062) {
        throw new ConflictException('username must be unique');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
