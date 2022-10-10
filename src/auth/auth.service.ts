import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthCredentialDto): Promise<User> {
    return this.userRepository.createUser(dto);
  }

  async signIn(dto: AuthCredentialDto): Promise<IAccessToken> {
    const { username, password } = dto;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        username,
      };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException();
  }
}
