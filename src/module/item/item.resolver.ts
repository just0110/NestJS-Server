import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'

import { ItemEntity } from './item.entity'
import { ItemService } from './item.service'
import { CreateItemInput } from './inputs/create-item.input'
import { UpdateItemInput } from './inputs/update-item.input'

@Resolver()
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [ItemEntity], { name: 'items' })
  findAllItems() {
    return this.itemService.findAll()
  }

  @Query(() => ItemEntity)
  findOneItem(@Args('itemId', { type: () => String }) itemId: string) {
    return this.itemService.findOne(itemId)
  }

  @Mutation(() => ItemEntity)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Args('image', { type: () => GraphQLUpload })
    file: Promise<FileUpload>
  ) {
    const { filename, createReadStream } = await file

    const filePath = join(process.cwd(), `./src/files/${uuidv4()}.${filename}`)

    createReadStream()
      .pipe(createWriteStream(filePath))
      .on('finish', () => {
        // Upload to bucket -> Add to Logger
      })
      .on('error', (error) => console.log('ERROR!: ', error))

    return this.itemService.create({
      ...createItemInput,
      image: filePath
    })
  }

  @Mutation(() => ItemEntity)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @Args('image', { type: () => GraphQLUpload })
    file: Promise<FileUpload>
  ) {
    const { filename, createReadStream } = await file
    const filePath = join(process.cwd(), `./src/files/${uuidv4()}.${filename}`)

    createReadStream()
      .pipe(createWriteStream(filePath))
      .on('finish', () => {
        // Upload to bucket
      })
      .on('error', (error) => new ErrorEvent('Item image Loading', error))

    return this.itemService.update({ ...updateItemInput, image: filePath })
  }

  @Mutation(() => String)
  removeItem(@Args('itemId', { type: () => String }) itemId: string) {
    return this.itemService.delete(itemId)
  }
}
