import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsUUID, Length, Matches, Validate } from 'class-validator'
import { UserEmailIsUnique } from '../validations/UserEmailIsUnique '

@InputType('UserInputUpdate')
export class UserUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Length(3)
  @Field()
  name: string

  @Field()
  @Length(3)
  @IsEmail()
  @Validate(UserEmailIsUnique)
  email: string

  @Field()
  passwd: string

  @Field()
  @Length(3)
  role: string
}
