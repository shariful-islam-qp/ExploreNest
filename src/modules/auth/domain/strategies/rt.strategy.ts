import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { JWTPayload } from '../../application/types/jwt.type'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-strategy-secret',
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: JWTPayload) {
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
