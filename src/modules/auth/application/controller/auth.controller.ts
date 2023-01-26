import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common'
import { AuthService } from '../../domain/service/auth.service'
import { AuthDto } from '../dtos/auth.dto'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserTypes } from '../types/user.types'

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  // Route to new user signup
  @Post('local/signup')
  async signUpLocal(@Body() createUserDto: CreateUserDto): Promise<UserTypes> {
    return this.authService.signUpLocal(createUserDto)
  }

  // Route to existing user signin
  @Post('local/login')
  @HttpCode(200)
  async signInLocal(@Body() authDto: AuthDto): Promise<UserTypes> {
    return this.authService.signInLocal(authDto)
  }

  // Route to logout existing user
  @Post('logout')
  async logout() {
    // return this.authService.signUpLocal()
  }

  // Route to get access token from refresh token
  @Post('refresh')
  async refreshToken() {
    // return this.authService.signUpLocal()
  }
}
