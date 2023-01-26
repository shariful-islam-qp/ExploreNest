import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './application/controller/auth.controller'
import { User } from './domain/entities'
import { AuthService } from './domain/service/auth.service'
import { AtStrategy, RtStrategy } from './domain/strategies'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
