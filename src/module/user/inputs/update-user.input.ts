import { CreateUserInput } from './create-user.input'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userId: string

  @Field(() => String, {
    description: 'Description for the user',
    nullable: true
  })
  description: string

  @Field(() => String, { description: 'Name of the user', nullable: true })
  name: string

  @Field(() => String, { description: 'Surname of the user', nullable: true })
  surname: string

  @Field(() => Number, { description: 'Surname of the user', nullable: true })
  age: number

  @Field(() => Number, { description: 'Phone of the user', nullable: true })
  phone: number

  @Field(() => String, { description: 'Address of the user', nullable: true })
  address: string

  @Field(() => String, { description: 'Image for the user', nullable: true })
  image: string
}
