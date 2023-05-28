import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Base {
  // @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date
}
