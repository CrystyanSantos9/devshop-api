import { Brand } from '../entities/brand.entity'
import { BrandCreateInput } from './brand-create.input'

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const entity = new Brand()
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
}
