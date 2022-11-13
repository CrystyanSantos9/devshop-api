import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'

@InputType('ProductUpdateInput')
export class ProductUpdateInput {
  @Field({ nullable: false })
  @IsUUID()
  id: string //criamos o dto pq precisamos do id

  @Field({ nullable: true })
  @Length(3)
  name: string

  @Field({ nullable: true })
  @Length(10)
  description: string

  @Field({ nullable: true })
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field({ nullable: true })
  @IsUUID()
  category: string //id
}
