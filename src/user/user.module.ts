import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserEmailIsUnique } from './validations/UserEmailIsUnique '

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, UserEmailIsUnique]
})
export class UserModule {}
