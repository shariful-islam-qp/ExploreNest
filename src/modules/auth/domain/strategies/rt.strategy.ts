import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { JWTPayloadInterface } from '../../application/interfaces/jwt.interface'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-strategy-secret',
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: JWTPayloadInterface) {
    const refreshToken = req
      ?.get('Authorization')
      ?.replace('Bearer ', '')
      ?.trim()

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed')

    return {
      ...payload,
      refreshToken,
    }
  }
}
