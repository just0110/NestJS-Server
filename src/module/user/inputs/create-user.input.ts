import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Unique email of the user' })
  email: string

  @Field(() => String, { description: 'One of the enums roles for the user' })
  role: string
}
