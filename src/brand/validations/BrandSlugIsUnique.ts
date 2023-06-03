import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import { BrandService } from '../brand.service'

@ValidatorConstraint({ name: 'BrandSlugIsUnique', async: true })
export class BrandSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const brand = await this.brandService.findBySlug(text)
    if (brand) {
      console.log(brand)
      if (id) {
        console.log(validationArguments.object)
        if (id === brand.id) return true
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
