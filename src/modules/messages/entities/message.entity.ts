import { Base } from 'src/modules/auth/domain/entities'
import { Column, Entity } from 'typeorm'

@Entity('message')
export class Message extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'text', type: 'varchar' })
  text: string
}
