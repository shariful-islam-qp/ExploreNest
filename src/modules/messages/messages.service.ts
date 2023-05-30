import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from './entities/message.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  clientToUser = {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messageRepository.create({ ...createMessageDto })
    await this.messageRepository.save(newMessage)
    return newMessage
  }

  async findAll() {
    return await this.messageRepository.find()
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId]
  }
}
