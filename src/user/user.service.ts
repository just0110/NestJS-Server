import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { uuid } from 'uuidv4'
import { EntityRepository } from '@mikro-orm/core'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: EntityRepository<UserEntity>
  ) {}

  async getUsers() {
    return await this.userRepository.findAll()
  }

  async createUser(email: string): Promise<UserEntity> {
    const user = this.userRepository.create({
      id: uuid(),
      email: email
    })

    await this.userRepository.persistAndFlush(user)
    return user
  }
}
