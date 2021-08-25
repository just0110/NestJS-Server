import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserType } from './user.type'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserType])
  getUsers() {
    return this.userService.getUsers()
  }

  @Mutation(() => UserType)
  createUser(@Args('email') email: string) {
    return this.userService.createUser(email)
  }
}
