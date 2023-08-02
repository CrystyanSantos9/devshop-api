import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { UserService } from '../user.service'

@ValidatorConstraint({ name: 'userEmailIsUnique', async: true })
export class UserEmailIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const user = await this.userService.findByEmail(text)
    if (user) {
      console.log(user)
      if (id) {
        console.log(validationArguments.object)
        if (id === user.id) return true
      }
      return false
    }
    return true
  }

  // podemos remover argss ss
  defaultMessage(args: ValidationArguments): string {
    return 'Email already exists'
  }
}
