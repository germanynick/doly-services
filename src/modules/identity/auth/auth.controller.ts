import { Controller, Get, Post, Body } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDto } from './auth.dto'
import { Public } from '@core/decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Get('me')
  async me() {
    return this.service.me()
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto)
  }
}
