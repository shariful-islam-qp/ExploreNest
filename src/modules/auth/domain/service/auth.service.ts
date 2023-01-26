import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../../application/dtos/create-user.dto'
import { User } from '../entities'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUpLocal(createUserDto: CreateUserDto) {
    const hash = await this.hashData(createUserDto.password)
    this.logger.log('Hash created done')

    const newUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hash,
    })

    await this.userRepository.save(newUser)
    this.logger.log('New sign up done')

    const tokens = await this.getToken(newUser.id, newUser.email)
    this.logger.log('Both At and Rt generation done')

    await this.updateRtByUserId(newUser.id, tokens.refresh_token)
    this.logger.log('Update refresh token in user table done')

    return tokens
  }

  async signInLocal() {
    return
  }

  async logout() {
    return
  }

  async refreshToken() {}

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  async getToken(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-strategy-secret',
          expiresIn: 15 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-strategy-secret',
          expiresIn: 7 * 60 * 60 * 24,
        },
      ),
    ])

    return {
      access_token: at,
      refresh_token: rt,
    }
  }

  async updateRtByUserId(userId: number, rt: string) {
    const refreshToken = await this.hashData(rt)
    return this.userRepository.update(userId, { refreshToken })
  }
}
