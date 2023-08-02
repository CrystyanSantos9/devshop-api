import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    //Bearer Token = split(): [Bearer, token] --> get pos[1y]
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[1]
    ) {
      const accessToken = req.headers.authorization.split(' ')[1]
      try {
        const payload = this.jwtService.verify(accessToken)
        if (payload.scope.indexOf('accessToken') >= 0) {
          req.user = payload.id
          return true
        }
      } catch (err) {}
    }
    return false
  }
}
