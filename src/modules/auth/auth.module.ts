import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthController } from './application/controller/auth.controller'
import { AuthService } from './domain/service/auth.service'

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
