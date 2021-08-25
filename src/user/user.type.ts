import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType('user')
export class UserType {
  @Field(() => ID)
  id: string

  @Field()
  email: string
}
