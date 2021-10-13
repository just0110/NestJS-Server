import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { Logger } from '@nestjs/common'

@Resolver()
export class UserResolver {
  logger: Logger

  constructor(private readonly userService: UserService) {
    this.logger = new Logger()
  }

  @Query(() => [UserEntity], { name: 'users' })
  async findAllUsers() {
    const users = await this.userService.findAll()
    this.logger.log(
      `User Resolver (find all users) received length of users: ${JSON.stringify(
        users.length
      )}`
    )
    return users
  }

  @Query(() => UserEntity)
  async findOneUser(@Args('userId', { type: () => String }) userId: string) {
    const user = await this.userService.findOne(userId)
    this.logger.log(
      `User Resolver (find user) received user data: ${JSON.stringify(user)}`
    )
    return user
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput)
    this.logger.log(
      `User Resolver (create user) create user with data: ${JSON.stringify(
        user
      )}`
    )
    return user
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('createUserInput') updateUserInput: UpdateUserInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file: Promise<FileUpload>
  ) {
    if (file) {
      const { filename, createReadStream } = await file
      const filePath = join(
        process.cwd(),
        `./src/files/${uuidv4()}.${filename}`
      )

      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => {
          // Add Logger -> Image loaded!
        })
        .on('error', (error) => console.log('ERROR!: ', error))
      const user = await this.userService.update({
        ...updateUserInput,
        image: filePath
      })
      this.logger.log(
        `User Resolver (create user) updated user data: ${JSON.stringify(user)}`
      )
      return user
    }
    const user = await this.userService.update({
      ...updateUserInput
    })
    this.logger.log(
      `User Resolver (create user) updated user data: ${JSON.stringify(user)}`
    )
    return user
  }

  @Mutation(() => String)
  removeUser(@Args('userId', { type: () => String }) userId: string) {
    this.logger.log(
      `User Resolver (delete user) deleted user with id: ${JSON.stringify(
        userId
      )}`
    )
    return this.userService.delete(userId)
  }
}
