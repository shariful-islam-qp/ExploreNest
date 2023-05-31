import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { WinstonModule } from 'nest-winston'
import { createLogger } from 'winston'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { customFormat, transports } from './config/logger/logger.config'

const instance = createLogger({
  format: customFormat,
  transports,
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Nest ex')
    .setDescription('Nest explore API description')
    .setVersion('1.0')
    .addTag('nest')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)
}

bootstrap()
