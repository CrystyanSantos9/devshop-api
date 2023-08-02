import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length, Matches, Validate } from 'class-validator'
import { UserEmailIsUnique } from '../validations/UserEmailIsUnique '

@InputType('UserInput')
export class UserCreateInput {
  @Field({ nullable: false })
  @Length(5) // mínimo de 5 caracteres
  name: string

  @Length(5) // mínimo de 5 caracteres
  @Field({ nullable: false })
  @IsEmail()
  @Validate(UserEmailIsUnique)
  email: string

  @Field({ nullable: false })
  @Length(5) // mínimo de 5 caracteres
  passwd: string

  @Field()
  @Length(3)
  role: string
}
