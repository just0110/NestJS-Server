import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Unique email of the user' })
  email: string

  @Field(() => String, { description: 'Password of the user' })
  password: string

}
