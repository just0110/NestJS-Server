import { IsOptional } from 'class-validator'

export class CreateItemDto {
  @IsOptional()
  title?: string

  @IsOptional()
  description?: string

  @IsOptional()
  image?: string
}
