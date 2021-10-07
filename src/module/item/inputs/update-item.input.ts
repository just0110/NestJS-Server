import { CreateItemInput } from './create-item.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { ItemStatus } from '../constants/item.types'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String)
  itemId: string

  @Field(() => String, { description: 'Status for the item', nullable: true })
  status: ItemStatus
}
