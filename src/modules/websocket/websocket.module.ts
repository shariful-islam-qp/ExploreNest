import { Module } from '@nestjs/common'
import { ChatController } from './application/controller/chat.controller'
import { join } from 'path'

@Module({
  imports: [],
  controllers: [ChatController],
})
export class WebsocketModule {}
