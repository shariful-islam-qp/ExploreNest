import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseModule } from './modules/database/database.module'
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [DatabaseModule, AuthModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
