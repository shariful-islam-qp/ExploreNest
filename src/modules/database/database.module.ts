import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from 'src/config/db/data-source'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class DatabaseModule {}
