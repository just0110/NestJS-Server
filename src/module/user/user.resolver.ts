import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  findAllUsers() {
    return this.userService.findAll()
  }

  @Query(() => UserEntity)
  findOneUser(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.findOne(userId)
  }

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('createUserInput') updateUserInput: UpdateUserInput,
    @Args('image', { type: () => GraphQLUpload })
    file: Promise<FileUpload>
  ) {
    const { filename, createReadStream } = await file
    const filePath = join(process.cwd(), `./src/files/${uuidv4()}.${filename}`)

    createReadStream()
      .pipe(createWriteStream(filePath))
      .on('finish', () => {
        // Add Logger -> Image loaded!
      })
      .on('error', (error) => console.log('ERROR!: ', error))

    return this.userService.update({ ...updateUserInput, image: filePath })
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.delete(userId)
  }
}
