import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './category/category.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProductModule } from './product/product.module'
import { BrandModule } from './brand/brand.module'
import { UserModule } from './user/user.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], //injetado por nós e importado do ConfigModule
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_DSN'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      })
    }),
    CoreModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.POSTGRES_DSN,
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   // entities: [Category],
    //   logging: true
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    CategoryModule,
    ProductModule,
    BrandModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
