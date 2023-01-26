import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../../domain/service/auth.service'
import { AuthDto } from '../dtos/auth.dto'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserTypes } from '../types/user.types'
import { Request } from 'express'
import { AtAuthGuard, RtAuthGuard } from '../../domain/guards'

@Controller('auth')
export class AuthController {
  // private logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  // Route to new user signup
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() createUserDto: CreateUserDto): Promise<UserTypes> {
    return this.authService.signUpLocal(createUserDto)
  }

  // Route to existing user signin
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() authDto: AuthDto): Promise<UserTypes> {
    return this.authService.signInLocal(authDto)
  }

  // Route to logout existing user
  @UseGuards(AtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req.user
    await this.authService.logout(+user['sub'])
    return 'Successfully logged out'
  }

  // Route to get access token from refresh token
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    const user = req.user
    return this.authService.refreshToken(user['sub'], user['refreshToken'])
  }
}
