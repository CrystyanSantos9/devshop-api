import { User } from '../entities/user.entity'
import { UserCreateInput } from './user-create.input'
import { UserUpdateInput } from './user-update.input'

export class UserMapper {
  public static toEntity(input: UserCreateInput) {
    const entity = new User()
    entity.name = input.name
    entity.email = input.email
    entity.passwd = input.passwd
    entity.role = input.role
    return entity
  }

  public static toUpdateEntity(input: UserUpdateInput) {
    const entity = new User()
    entity.id = input.id
    entity.name = input.name
    entity.email = input.email
    entity.passwd = input.passwd
    entity.role = input.role
    return entity
  }
}
