import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { CreateUserInput } from './inputs/create-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return await this.userRepository.find()
  }

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createUserInput)
    return await this.userRepository.save(user)
  }
}
