import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'

import { ItemEntity } from './item.entity'
import { ItemService } from './item.service'
import { CreateItemInput } from './inputs/create-item.input'
import { UpdateItemInput } from './inputs/update-item.input'
import { Logger } from '@nestjs/common'

@Resolver()
export class ItemResolver {
  logger: Logger

  constructor(private readonly itemService: ItemService) {
    this.logger = new Logger()
  }

  @Query(() => [ItemEntity], { name: 'items' })
  async findAllItems() {
    const items = await this.itemService.findAll()
    this.logger.log(
      `Item Resolver (find all items) received length of items: ${JSON.stringify(
        items.length
      )}`
    )
    return items
  }

  @Query(() => ItemEntity)
  async findOneItem(@Args('itemId', { type: () => String }) itemId: string) {
    const item = await this.itemService.findOne(itemId)
    this.logger.log(
      `Item Resolver (find item) received item data: ${JSON.stringify(item)}`
    )
    return item
  }

  @Mutation(() => ItemEntity)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file: Promise<FileUpload>
  ) {
    if (file) {
      const { filename, createReadStream } = await file

      const filePath = join(
        process.cwd(),
        `./src/files/${uuidv4()}.${filename}`
      )

      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => {
          // Upload to bucket -> Add to Logger
        })
        .on('error', (error) => console.log('ERROR!: ', error))

      const user = await this.itemService.create({
        ...createItemInput,
        image: filePath
      })
      this.logger.log(
        `Item Resolver (create item) create item with data: ${JSON.stringify(
          user
        )}`
      )
      return user
    }
    const user = await this.itemService.create({
      ...createItemInput
    })
    return user
  }

  @Mutation(() => ItemEntity)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file: Promise<FileUpload>
  ) {
    if (file) {
      const { filename, createReadStream } = await file
      const filePath = join(
        process.cwd(),
        `./src/files/${uuidv4()}.${filename}`
      )

      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => {
          // Upload to bucket
        })
        .on('error', (error) => new ErrorEvent('Item image Loading', error))
      const item = await this.itemService.update({
        ...updateItemInput,
        image: filePath
      })
      this.logger.log(
        `Item Resolver (update item) updated item data: ${JSON.stringify(item)}`
      )
      return item
    }
    const item = await this.itemService.update({
      ...updateItemInput
    })
    this.logger.log(
      `Item Resolver (update item) updated item data: ${JSON.stringify(item)}`
    )
    return item
  }

  @Mutation(() => String)
  removeItem(@Args('itemId', { type: () => String }) itemId: string) {
    this.logger.log(
      `Item Resolver (delete item) delete item with id: ${JSON.stringify(
        itemId
      )}`
    )
    return this.itemService.delete(itemId)
  }
}
