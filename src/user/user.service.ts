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

  async auth(email: string, passwd: string): Promise<[User, AuthToken]> {
    const userExists = await this.userRepository.findOne({ where: [{ email }] })
    if (userExists && (await userExists.checkPassword(passwd))) {
      const authToken = new AuthToken()
      authToken.user = userExists
      const token = await this.authTokenRepository.save(authToken)
      console.log(token)
      return [userExists, authToken]
    } else {
      return null
    }
  }
}
