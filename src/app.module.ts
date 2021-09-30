import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './module/user/user.module'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      port: 5432,
      type: 'postgres',
      host: 'localhost',
      synchronize: true,
      username: 'postgres',
      password: 'Test1234!',
      autoLoadEntities: true,
      database: 'postgres',
      keepConnectionAlive: true
    }),
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: './schema.gql'
    })
  ]
})
export class AppModule {}
