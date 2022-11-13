import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { CategoryService } from '../category.servcice'

@ValidatorConstraint({ name: 'categorySlugIsUnique', async: true })
export class CategorySlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const category = await this.categoryService.findBySlug(text)
    if (category) {
      console.log(category)
      if (id) {
        console.log(validationArguments.object)
        if (id === category.id) return true
      }
      return false
    }
    return true
  }

  // podemos remover argss ss
  defaultMessage(args: ValidationArguments): string {
    return 'Slug must be unique'
  }
}
