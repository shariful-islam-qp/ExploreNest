import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'

type JWTPayload = {
  sub: string
  email: string
}

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
    const refreshToken = req.get('Authorization').replace('Bearer ', '').trim()
    return {
      ...payload,
      refreshToken,
    }
  }
}
