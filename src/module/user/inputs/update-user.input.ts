import { CreateUserInput } from './create-user.input'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userId: string

  @Field(() => String, { description: 'Description for the user' })
  description: string

  @Field(() => String, { description: 'Name of the user' })
  name: string

  @Field(() => String, { description: 'Surname of the user' })
  surname: string

  @Field(() => Number, { description: 'Surname of the user' })
  age: number

  @Field(() => Number, { description: 'Phone of the user' })
  phone: number

  @Field(() => String, { description: 'Address of the user' })
  address: string

  @Field(() => String, { description: 'Image for the user' })
  image: string
}
