import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { WinstonModule } from 'nest-winston'
import { createLogger } from 'winston'
import * as winston from 'winston'
import * as path from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `{"time": "${timestamp}", "level":"${level}", "message": "${message}"}`
  }),
)

const transports = [
  new winston.transports.Console({ level: 'silly' }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../logs/'),
    filename: 'combined.log',
    level: 'info',
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../logs/'),
    filename: 'error.log',
    level: 'error',
  }),
]

const instance = createLogger({
  format: customFormat,
  transports,
})

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: WinstonModule.createLogger({ instance }),
  // })

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  })

  // Load static engin
  app.useStaticAssets(path.join(__dirname, '..', 'public'))
  app.setBaseViewsDir(
    path.join(__dirname, '../../src/modules/websocket/', 'client'),
  )
  app.setViewEngine('hbs')

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

  await app.listen(3000)
}

bootstrap()
