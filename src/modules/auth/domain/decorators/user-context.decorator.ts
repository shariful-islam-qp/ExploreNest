import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { UserContext } from '../../application/interfaces/user-context.interface'

export const GetUserContext = createParamDecorator(
  (data: undefined, ctx: ExecutionContext): UserContext => {
    const request = ctx.switchToHttp().getRequest()
    if (!request.user) throw new UnauthorizedException()
    const user = request.user
    const userContext = new UserContext()
    Object.assign(userContext, user)
    return userContext
  },
)
