import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateItemInput {
  @Field(() => String, {
    description: 'Title for the item',
    nullable: true
  })
  title?: string

  @Field(() => String, {
    description: 'Description for the item',
    nullable: true
  })
  description?: string
}
