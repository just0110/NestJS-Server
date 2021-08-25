import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'

import { UserEntity } from './user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
