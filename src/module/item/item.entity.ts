import { ObjectType, Field } from '@nestjs/graphql'
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ItemStatus } from './constants/item.types'

@Entity()
@ObjectType()
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    description: 'Automatically generated id for the user'
  })
  itemId: string

  @Column()
  @Field(() => String, {
    description: 'Title for the item',
    nullable: true
  })
  title: string

  @Column()
  @Field(() => String, {
    description: 'Description for the item',
    nullable: true
  })
  description: string

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Image for the item',
    nullable: true
  })
  image?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column({ default: ItemStatus.PENDING })
  @Field(() => String, {
    description: 'Status for the item',
    nullable: true
  })
  status: ItemStatus
}
