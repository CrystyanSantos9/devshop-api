import { Field, InputType } from '@nestjs/graphql'

@InputType('AuthUserInput')
export class AuthUserInput {
  @Field({ nullable: false })
  email: string

  @Field({ nullable: false })
  passwd: string
}
