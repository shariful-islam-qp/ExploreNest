import { Timestamp } from 'typeorm'

export class UserContext {
  sub: string
  email: string
  refreshToken: string
  iat: Timestamp
  eat: Timestamp
}
