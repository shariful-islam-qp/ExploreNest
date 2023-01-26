import { Column, Entity } from 'typeorm'
import { Base } from './base.entity'

@Entity('users')
export class User extends Base {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string

  @Column({ name: 'last_name', type: 'varchar', nullable: true, default: null })
  lastName?: string

  @Column({ name: 'email', type: 'varchar' })
  email: string

  @Column({ name: 'password', type: 'varchar' })
  password: string

  @Column({ name: 'refresh_token', type: 'varchar' })
  refreshToken: string
}
