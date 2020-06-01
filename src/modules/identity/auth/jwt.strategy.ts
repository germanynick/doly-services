import { ExtractJwt, Strategy } from 'passport-jwt'

import { IJwtPayload } from '@core/dto'
import { JWT_SECRET_KEY } from '@core/env.config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    })
  }

  async validate(payload: IJwtPayload) {
    return payload
  }
}
