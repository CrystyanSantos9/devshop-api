import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'

@InputType('ProductInput')
export class ProductCreateInput {
  @Field({ nullable: false })
  @Length(3)
  name: string

  @Field({ nullable: false })
  @Length(10)
  description: string

  @Field({ nullable: false })
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field({ nullable: false })
  @IsUUID()
  category: string //id
}
