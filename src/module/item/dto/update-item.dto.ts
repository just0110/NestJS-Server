import { PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { CreateItemDto } from './create-item.dto'
import { ItemStatus } from '../constants/item.types'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsNotEmpty()
  itemId: string

  @IsOptional()
  status: ItemStatus
}
