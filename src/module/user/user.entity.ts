import { ObjectType, Field } from '@nestjs/graphql'
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

  @Column()
  @Field(() => String, { description: 'One of the enums roles for the user' })
  role: string // create ENUM
}
