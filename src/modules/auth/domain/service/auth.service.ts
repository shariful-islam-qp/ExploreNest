import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../../application/dtos/create-user.dto'
import { User } from '../entities'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserTypes } from '../../application/types/user.types'
import { AuthDto } from '../../application/dtos/auth.dto'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // service to signup new user
  async signUpLocal(createUserDto: CreateUserDto): Promise<UserTypes> {
    // check if the user is already exist or not
    const isUserExist = await this.userRepository.findOneBy({
      email: createUserDto.email,
    })
    if (isUserExist) throw new BadRequestException('Email already exists')

    // make hash of password
    const hash = await this.hashData(createUserDto.password)
    this.logger.log('Hash created done')

    // create new user instance
    const newUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hash,
    })

    // same the user instance to database
    const user = await this.userRepository.save(newUser)
    this.logger.log('New sign up done')

    // get access token and refresh token by user id and email pair
    const tokens = await this.getToken(user.id, user.email)
    this.logger.log('Both At and Rt generation done')

    // update refresh token in database for the user
    await this.updateRtByUserId(user.id, tokens.refresh_token)
    this.logger.log('Update refresh token in user table done')

    return {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user?.lastName,
        email: user.email,
      },
      tokens,
    }
  }

  async signInLocal(authDto: AuthDto): Promise<UserTypes> {
    const user = await this.userRepository.findOneBy({ email: authDto.email })

    if (!user) throw new ForbiddenException('Access denied')

    const isPasswordMatch = bcrypt.compare(user.password, authDto.password)

    if (!isPasswordMatch) throw new ForbiddenException('Access denied')

    const tokens = await this.getToken(user.id, user.email)
    this.logger.log('Both At and Rt generation done')

    await this.updateRtByUserId(user.id, tokens.refresh_token)
    this.logger.log('Update refresh token in user table done')

    return {
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user?.lastName,
        email: user.email,
      },
      tokens,
    }
  }

  async logout() {
    return
  }

  async refreshToken() {}

  // function to generate hash from a given string
  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  // function to generate jwt token from a given userId and a string pair
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

  // service to update refresh_token field in user record by user id
  async updateRtByUserId(userId: number, rt: string) {
    const refreshToken = await this.hashData(rt)
    return this.userRepository.update({ id: userId }, { refreshToken })
  }
}
