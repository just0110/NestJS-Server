import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { graphqlUploadExpress } from 'graphql-upload'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './module/user/user.module'
import { ItemModule } from './module/item/item.module'

@Module({
  imports: [
    UserModule,
    ItemModule,
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
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req })
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
