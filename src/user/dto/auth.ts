import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('AuthToken')
export class AuthToken {
  @Field({ nullable: false })
  accessToken: string

  @Field({ nullable: false })
  refreshToken: string
}
