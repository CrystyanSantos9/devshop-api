import {
  Args,
  Context,
  GqlExecutionContext,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserPublic } from './dto/user'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { UserMapper } from './dto/user.mapper'
import { JwtService } from '@nestjs/jwt'
import { AuthToken } from './dto/auth'
import { AuthUserInput } from './dto/auth-user.input'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'
import { AuthUserId } from 'src/utils/jwt-user.decorator'
import { AuthSession } from './dto/auth-session'

@Resolver(of => UserService)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard)
  @Query(returns => [UserPublic], { name: 'panelGetAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return this.userService.findAll()
  }

  @UseGuards(AuthGuard)
  @Query(returns => [AuthSession], { name: 'panelGetAllUserSessions' })
  async getAllUserSessions(@Args('id') id: string): Promise<AuthSession[]> {
    return this.userService.findAllUserSessions(id)
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserPublic, { name: 'panelGetUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserPublic, { name: 'panelGetUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    console.log('Email recebido', email)
    return await this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => UserPublic, { name: 'panelCreateUser' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => UserPublic, { name: 'panelUpdateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    console.log('Atualizando na api', input)
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }

  @Mutation(returns => AuthToken, { name: 'auth' })
  async auth(
    @Context() context: GraphQLExecutionContext,
    @Args('input') input: AuthUserInput
  ): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(
      input.email,
      input.passwd,
      context['req']['headers']['user-agent']
    )

    if (user) {
      const authToken = new AuthToken()
      authToken.refreshToken = this.jwtService.sign(
        {
          scope: ['refreshToken'],
          id: refreshToken.id
        },
        {
          expiresIn: '8 hours'
        }
      )

      authToken.accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', user.role],
          id: user.id
        },
        {
          expiresIn: '1 hours'
        }
      )
      return authToken
    } else {
      throw new Error('Bad Credentials')
    }
  }

  @Mutation(returns => String, { name: 'accessToken' })
  async accessToken(
    @Args('refreshToken') refreshToken: string
  ): Promise<string> {
    const refreshTokenDecoded = await this.jwtService.verify(refreshToken)
    // console.log(refreshTokenDecoded)
    if (
      refreshTokenDecoded &&
      refreshTokenDecoded.scope.indexOf('refreshToken') >= 0
    ) {
      // vai o processo de geração do token
      const authToken = await this.userService.getRefreshToken(
        refreshTokenDecoded.id
      )
      if (authToken) {
        const newAccessToken = this.jwtService.sign(
          {
            scope: ['accessToken', authToken.user.role],
            id: authToken.user.id
          },
          {
            expiresIn: '1 hours'
          }
        )
        return newAccessToken
      }
    }
    return null
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserPublic, { name: 'panelGetMe' })
  async getMe(@AuthUserId() id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }
}
