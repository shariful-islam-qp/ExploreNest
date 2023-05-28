import { Column, Entity } from 'typeorm'
import { Base } from './base.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Entity('users')
export class User extends Base {
  @ApiProperty({
    type: 'string',
    name: 'First Name',
    description: 'First name',
  })
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string

  @ApiPropertyOptional({
    type: 'string',
    name: 'Last Name',
    description: 'Last name',
  })
  @Column({ name: 'last_name', type: 'varchar', nullable: true, default: null })
  lastName?: string

  @ApiProperty({
    type: 'string',
    name: 'Email',
    description: 'Email',
  })
  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string

  @ApiProperty({
    type: 'string',
    name: 'Password',
    description: 'user password',
  })
  @Column({ name: 'password', type: 'varchar' })
  password: string

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  refreshToken: string
}
