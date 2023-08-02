import { Category } from 'src/category/entities/category.entity'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductUpdateInput } from './dto/product-update.input'
import { Product } from './product.entity'

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.description = input.description
    entity.slug = input.slug

    const category = new Category()
    category.id = input.category
    entity.category = category
    entity.optionNames = ['cor', 'tamanho']
    entity.variations = [
      {
        optionName1: 'vermelho',
        optionName2: 'P',
        sku: 'p1',
        price: 10,
        weight: 0.5
      },
      {
        optionName1: 'azul',
        optionName2: 'P',
        sku: 'p1',
        price: 10,
        weight: 0.5
      }
    ]

    return entity
  }

  public static fromUpdateToEntity(input: ProductUpdateInput): Product {
    const entity = new Product()
    entity.id = input.id
    entity.name = input.name
    entity.description = input.description
    entity.slug = input.slug
    const category = new Category()
    category.id = input.category
    entity.category = category

    return entity
  }

  public static fromEntityToPublic(entity: Product): ProductPublic {
    const product = new ProductPublic()
    product.id = entity.id
    product.name = entity.name
    product.slug = entity.slug
    product.description = entity.description
    if (entity.category) {
      console.log(entity)
      product.category = entity.category.toString()
    }
    return product
  }
}
