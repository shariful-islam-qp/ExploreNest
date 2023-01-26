import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const logger = new Logger('main.ts:bootstrap')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // add validation pipeline
  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()
