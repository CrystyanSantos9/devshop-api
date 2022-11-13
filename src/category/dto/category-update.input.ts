import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { CategorySlugIsUnique } from '../validations/CategorySlugIsUnique'

@InputType('CategoryInputUpdate')
export class CategoryUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Length(3)
  @Field()
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(CategorySlugIsUnique)
  slug: string
}
