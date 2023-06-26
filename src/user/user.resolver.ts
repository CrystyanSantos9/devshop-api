import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserPublic } from './dto/user'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { UserMapper } from './dto/user.mapper'
import { JwtService } from '@nestjs/jwt'
import { AuthToken } from './dto/auth'

@Resolver(of => UserService)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Query(returns => [UserPublic], { name: 'getAllUsers' })
  async getAllCategories(): Promise<UserPublic[]> {
    return this.userService.findAll()
  }

  @Query(returns => UserPublic, { name: 'getUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }

  @Query(returns => UserPublic, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    return await this.userService.findByEmail(email)
  }

  @Mutation(returns => UserPublic, { name: 'createUser' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }

  @Mutation(returns => UserPublic, { name: 'updateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @Mutation(returns => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }

  @Mutation(returns => AuthToken, { name: 'auth' })
  async auth(@Args('id') input: string): Promise<AuthToken> {
    const authToken = new AuthToken()
    authToken.refreshToken = this.jwtService.sign({
      scope: 'refreshToken',
      id: '<id>'
    })

    authToken.accessToken = this.jwtService.sign({
      scope: 'accessToken',
      id: '<id>'
    })

    return authToken
  }
}
