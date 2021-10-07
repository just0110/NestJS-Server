import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserDto {
  @Field(() => String, { description: 'Unique email of the user' })
  email: string

  @Field(() => String, { description: 'Password of the user' })
  password: string
}
