import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserEmailIsUnique } from './validations/UserEmailIsUnique '
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthToken } from './entities/authtoken.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthToken]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      })
    })
  ],
  providers: [UserService, UserResolver, UserEmailIsUnique]
})
export class UserModule {}
