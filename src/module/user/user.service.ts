import { Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import * as fs from 'fs'

@Injectable()
export class UserService {
  logger: Logger

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    this.logger = new Logger()
  }

  async findAll(): Promise<Array<UserEntity>> {
    const users = await this.userRepository.find()
    this.logger.warn(
      `User Service (Find all users) received length of users: ${JSON.stringify(
        users.length
      )}`
    )
    return users
  }

  async findOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      this.logger.error(
        `User Service (find user) user with id ${JSON.stringify(
          userId
        )} is not found`
      )
      throw new Error(`Item with id ${userId} is not found`)
    }
    this.logger.warn(
      `User Service (Find user) received user data: ${JSON.stringify(user)}`
    )
    return user
  }

  async create(createItemInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createItemInput)
    const savedData = await this.userRepository.save(user)
    this.logger.warn(
      `User Service (Create user) created user with data: ${JSON.stringify(
        savedData
      )}`
    )
    return savedData
  }

  async delete(userId: string): Promise<string> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      this.logger.error(
        `User Service (delete user) User with id ${userId} is not found`
      )
      throw new Error(`User with id ${userId} is not found`)
    }
    if (user.image) {
      try {
        fs.unlinkSync(user.image)
      } catch (err) {
        this.logger.error(err)
      }
    }
    await this.userRepository.delete(userId)
    this.logger.warn(
      `User Service (Delete user) deleted user with id ${userId}}`
    )
    return userId
  }

  async update(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      userId: updateUserInput.userId,
      ...updateUserInput
    })
    this.logger.warn(
      `User Service (Update user) updated user data ${JSON.stringify(user)}`
    )

    return await this.userRepository.save(user)
  }
}
