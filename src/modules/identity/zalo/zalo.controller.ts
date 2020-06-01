import { Controller, Get, Body, Post } from '@nestjs/common'
import { LoginDto } from './zalo.dto'
import { ZaloService } from './zalo.service'
import { Public } from '@core/decorators'

@Controller('zalo')
export class ZaloController {
  constructor(private readonly service: ZaloService) {}

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto)
  }

  @Get('/login-url')
  @Public()
  async getLoginUrl() {
    return this.service.getLoginUrl()
  }
}
