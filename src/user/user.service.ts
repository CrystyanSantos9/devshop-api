import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { AuthToken } from './entities/authtoken.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: Repository<AuthToken>
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findAllUserSessions(id: string): Promise<AuthToken[]> {
    const result = await this.authTokenRepository.find({
      where: { user: { id } }
    })
    return result
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }

  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }

  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOne({
      where: { id: input.id }
    })

    entity.name = input.name
    entity.email = input.email
    entity.passwd = input.passwd
    entity.role = input.role

    await this.userRepository.save(entity)

    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id)
      return true
    } catch {
      return false
    }
  }

  async auth(
    email: string,
    passwd: string,
    userAgent: string
  ): Promise<[User, AuthToken]> {
    const userExists = await this.userRepository.findOne({ where: [{ email }] })
    if (userExists && (await userExists.checkPassword(passwd))) {
      const authToken = new AuthToken()
      authToken.user = userExists
      authToken.userAgent = userAgent
      const token = await this.authTokenRepository.save(authToken)
      //  console.log(token)
      return [userExists, authToken]
    } else {
      return [null, null]
    }
  }

  async getRefreshToken(id: string): Promise<AuthToken> {
    const refreshToken = await this.authTokenRepository.findOne({
      where: { id, active: true },
      relations: {
        user: true
      }
    })
    console.log('AuthToken ---> ', refreshToken)
    refreshToken.lastUsedAt = new Date()
    await this.authTokenRepository.save(refreshToken)
    return refreshToken
  }

  async invalidateRefreshToken(id: string): Promise<boolean> {
    const refreshToken = await this.authTokenRepository.findOne({
      where: [{ id }],
      relations: {
        user: false
      }
    })
    refreshToken.active = false
    await this.authTokenRepository.save(refreshToken)
    return true
  }
}
