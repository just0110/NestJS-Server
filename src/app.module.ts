import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
