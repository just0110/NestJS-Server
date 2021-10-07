import { CreateUserDto } from './create-user.dto'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => String)
  userId: string

  @Field(() => String, { description: 'Description for the user' })
  description: string

  @Field(() => String, { description: 'Name of the user' })
  name: string

  @Field(() => String, { description: 'Surname of the user' })
  surname: string

  @Field(() => Int, { description: 'Surname of the user' })
  age: number

  @Field(() => String, { description: 'Image for the user' })
  image: string
}
