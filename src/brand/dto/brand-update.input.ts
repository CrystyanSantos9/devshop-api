import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { BrandSlugIsUnique } from '../validations/BrandSlugIsUnique'

@InputType('BrandInputUpdate')
export class BrandUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Length(3)
  @Field()
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(BrandSlugIsUnique)
  slug: string
}
