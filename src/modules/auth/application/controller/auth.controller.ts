import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../../domain/service/auth.service'
import { AuthDto } from '../dtos/auth.dto'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserInterface } from '../interfaces/user.interface'
import { AtAuthGuard, RtAuthGuard } from '../../domain/guards'
import { Public, GetUserContext } from '../../domain/decorators'
import { UserContext } from '../interfaces/user-context.interface'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Route to new user signup
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'New user signup' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New user signup done',
    type: Promise<UserInterface>,
  })
  async signUpLocal(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserInterface> {
    return await this.authService.signUpLocal(createUserDto)
  }

  // Route to existing user signin
  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() authDto: AuthDto): Promise<UserInterface> {
    return await this.authService.signInLocal(authDto)
  }

  // Route to logout existing user
  @UseGuards(AtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserContext() user: UserContext) {
    await this.authService.logout(+user['sub'])
    return 'Successfully logged out'
  }

  // Route to get access token from refresh token
  @Public()
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUserContext() user: UserContext) {
    return await this.authService.refreshToken(
      +user['sub'],
      user['refreshToken'],
    )
  }
}
