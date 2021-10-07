import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    description: 'Automatically generated id for the user'
  })
  userId: string

  @Column()
  @Field(() => String, { description: 'Unique email of the user' })
  email: string

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Description for the user',
    nullable: true
  })
  description: string

  @Column()
  @Field(() => String, { description: 'Password of the user' })
  password: string

  @Column({ nullable: true })
  @Field(() => String, { description: 'Name of the user', nullable: true })
  name: string

  @Column({ nullable: true })
  @Field(() => String, { description: 'Surname of the user', nullable: true })
  surname: string

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Surname of the user', nullable: true })
  age: number

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Image for the item',
    nullable: true
  })
  image: string
}
