import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class ServiceEntity {
  @PrimaryKey()
  id: string

  @Property()
  email: string

  // address []
  // phone
  // title
  // description
  // ....
}
