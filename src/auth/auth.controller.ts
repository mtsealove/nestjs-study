import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body(ValidationPipe) dto: AuthCredentialDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Post('/signIn')
  @ApiOperation({ summary: '사용자 생성', description: '사용자를 생성한다' })
  @ApiCreatedResponse({ description: '사용자를 생성한다', type: User })
  signIn(@Body(ValidationPipe) dto: AuthCredentialDto): Promise<IAccessToken> {
    return this.authService.signIn(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req.user);
  }
}
