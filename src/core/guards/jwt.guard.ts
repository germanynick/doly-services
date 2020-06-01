import { Decorator } from '@core/enums'
import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublicHandler = this.reflector.get(Decorator.Public, context.getHandler())
    const isPublicClass = this.reflector.get(Decorator.Public, context.getClass())

    if (isPublicHandler || isPublicClass) {
      return true
    }

    return super.canActivate(context)
  }
}
