import { Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ItemEntity } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import * as fs from 'fs'

@Injectable()
export class ItemService {
  logger: Logger

  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
  ) {
    this.logger = new Logger()
  }

  async findAll(): Promise<Array<ItemEntity>> {
    const items = await this.itemRepository.find()
    this.logger.warn(
      `Item Service (find all items) received length of items: ${JSON.stringify(
        items.length
      )}`
    )
    return items
  }

  async findOne(itemId: string): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne(itemId)
    if (!item) {
      this.logger.error(
        `Item Service (find item) item with id ${JSON.stringify(
          itemId
        )} is not found`
      )
      throw new Error(`Item with id ${itemId} is not found`)
    }
    this.logger.warn(
      `Item Server (find item) received item data: ${JSON.stringify(item)}`
    )
    return item
  }

  async create(createItemDto: CreateItemDto): Promise<ItemEntity> {
    const item = this.itemRepository.create(createItemDto)
    const savedData = await this.itemRepository.save(item)
    this.logger.warn(
      `Item Service (create item) create item with data: ${JSON.stringify(
        savedData
      )}`
    )
    return savedData
  }

  async delete(itemId: string): Promise<string> {
    const item = await this.itemRepository.findOne(itemId)
    if (!item) {
      this.logger.error(
        `Item Service (delete item) item with id ${JSON.stringify(
          itemId
        )} is not found`
      )
      throw new Error(`Item with id ${itemId} is not found`)
    }
    if (item.image) {
      try {
        fs.unlinkSync(item.image)
      } catch (err) {
        this.logger.error(err)
        throw new Error(err)
      }
    }
    this.logger.warn(
      `Item Server (delete item) deleted item with data: ${JSON.stringify(
        item
      )}`
    )
    await this.itemRepository.delete(itemId)
    return itemId
  }

  async update(updateItemDto: UpdateItemDto): Promise<ItemEntity> {
    const item = await this.itemRepository.preload({
      itemId: updateItemDto.itemId,
      ...updateItemDto
    })
    this.logger.warn(
      `Item Server (update item) updated item data: ${JSON.stringify(item)}`
    )
    return await this.itemRepository.save(item)
  }
}
