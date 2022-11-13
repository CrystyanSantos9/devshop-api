import { Category } from '../entities/category.entity'
import { CategoryCreateInput } from './category-create.input'

export class CategoryMapper {
  public static toEntity(input: CategoryCreateInput) {
    const entity = new Category()
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
}
