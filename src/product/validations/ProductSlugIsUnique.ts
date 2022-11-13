import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { ProductService } from '../product.service'

@ValidatorConstraint({ name: 'productSlugIsUnique', async: true })
export class ProductSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const category = await this.productService.findBySlug(text)
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
