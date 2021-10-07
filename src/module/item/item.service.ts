import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ItemEntity } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
  ) {}

  async findAll(): Promise<Array<ItemEntity>> {
    return await this.itemRepository.find()
  }

  async findOne(itemId: string): Promise<ItemEntity> {
    return await this.itemRepository.findOne(itemId)
  }

  async create(createItemDto: CreateItemDto): Promise<ItemEntity> {
    const item = this.itemRepository.create(createItemDto)
    return await this.itemRepository.save(item)
  }

  async delete(itemId: string): Promise<string> {
    await this.itemRepository.delete(itemId)
    return itemId
  }

  async update(updateItemDto: UpdateItemDto): Promise<ItemEntity> {
    const item = await this.itemRepository.preload({
      itemId: updateItemDto.itemId,
      ...updateItemDto
    })

    return await this.itemRepository.save(item)
  }
}
