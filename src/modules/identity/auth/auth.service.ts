import { compare } from 'bcrypt'
import { Request } from 'express'

import { IJwtPayload } from '@core/dto'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { UserService } from '../user'
import { LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  @Inject(REQUEST) private readonly request: Request
  constructor(private readonly userService: UserService) {}

  async me() {
    const { username } = this.request.user as IJwtPayload
    const user = await this.userService.getByUsername(username)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getByUsername(loginDto.username)

    if (!user) {
      throw new UnauthorizedException()
    }

    const areEqual = await compare(loginDto.password, user.password)

    if (!areEqual) {
      throw new UnauthorizedException()
    }

    return this.userService.genToken(user)
  }

  async validateJwtPayload(payload: IJwtPayload) {
    const { username } = payload

    const user = await this.userService.getByUsername(username)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
