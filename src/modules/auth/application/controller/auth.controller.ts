import { Body, Controller, Logger, Post } from '@nestjs/common'
import { AuthService } from '../../domain/service/auth.service'
import { CreateUserDto } from '../dtos/create-user.dto'
import { TokenTypes } from '../types/token.types'

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  // Route to new user signup
  @Post('local/signup')
  async signUpLocal(@Body() createUserDto: CreateUserDto): Promise<TokenTypes> {
    return this.authService.signUpLocal(createUserDto)
  }

  // Route to existing user signin
  @Post('local/signin')
  async signInLocal() {
    // return this.authService.signUpLocal()
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
