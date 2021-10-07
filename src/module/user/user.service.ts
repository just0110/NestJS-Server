import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return await this.userRepository.find()
  }

  async findOne(itemId: string): Promise<UserEntity> {
    return await this.userRepository.findOne(itemId)
  }

  async create(createItemInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createItemInput)
    return await this.userRepository.save(user)
  }

  async delete(itemId: string): Promise<string> {
    await this.userRepository.delete(itemId)
    return itemId
  }

  async update(updateItemInput: UpdateUserInput): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      userId: updateItemInput.userId,
      ...updateItemInput
    })

    return await this.userRepository.save(user)
  }
}
