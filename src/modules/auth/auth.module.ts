import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './application/controller/auth.controller'
import { User } from './domain/entities'
import { AtAuthGuard } from './domain/guards'
import { AuthService } from './domain/service/auth.service'
import { AtStrategy, RtStrategy } from './domain/strategies'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtAuthGuard,
    },
  ],
})
export class AuthModule {}
