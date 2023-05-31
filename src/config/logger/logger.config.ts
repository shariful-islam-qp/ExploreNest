import * as winston from 'winston'
import * as path from 'path'

console.log(path.join(__dirname))
export const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `{"time": "${timestamp}", "level":"${level}", "message": "${message}"}`
  }),
)

export const transports = [
  new winston.transports.Console({ level: 'silly' }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs/'),
    filename: 'combined.log',
    level: 'info',
  }),
  new winston.transports.File({
    dirname: path.join(__dirname, '../../../../logs/'),
    filename: 'error.log',
    level: 'error',
  }),
]
