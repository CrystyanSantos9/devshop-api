import { Entity } from 'typeorm'
import { Brand } from '../entities/brand.entity'
import { BrandPublic } from './brand'
import { BrandCreateInput } from './brand-create.input'
import { BrandUpdateInput } from './brand-update.input'

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const entity = new Brand()
    entity.name = input.name
    entity.slug = input.slug
    entity.logo = ''
    return entity
  }

  public static toUpdateEntity(input: BrandUpdateInput): Brand {
    const entity = new Brand()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }

  public static fromEntityToPublic(entity: Brand): BrandPublic {
    const brandPublic = new BrandPublic()
    brandPublic.id = entity.id
    brandPublic.name = entity.name
    brandPublic.slug = entity.slug
    return brandPublic
  }
}
