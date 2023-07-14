import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('AuthSession')
export class AuthSession {
  @Field({ nullable: false })
  id: string
}
