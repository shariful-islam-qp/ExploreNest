import { Controller, Get, Render } from '@nestjs/common'
import { Public } from 'src/modules/auth/domain/decorators'

@Controller('chat')
export class ChatController {
  @Public()
  @Get()
  @Render('index')
  chat() { }
}
