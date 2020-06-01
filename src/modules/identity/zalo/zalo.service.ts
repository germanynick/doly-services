import axios from 'axios'
import { nanoid } from 'nanoid'

import { ZALO_APP_ID, ZALO_REDIRECT_URI, ZALO_SECRET_KEY } from '@core/env.config'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserService } from '../user'
import { IZaloProfile, LoginDto } from './zalo.dto'

@Injectable()
export class ZaloService {
  private readonly baseUrl = 'https://oauth.zaloapp.com/v3'
  private readonly graphUrl = 'https://graph.zalo.me/v2.0'

  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    try {
      const token = await this.getAcessToken(loginDto.oauthToken)
      const profile = await this.getProfile(token)
      const profileUrl = profile.picture?.data?.url

      let user = await this.userService.getByUsername(profile.id)

      if (!user) {
        user = await this.userService.create({
          name: profile.name,
          username: profile.id,
          password: nanoid(),
          profileUrl,
        })
      } else if (user.name !== profile.name || user.profileUrl !== profileUrl) {
        user = await this.userService.update(profile.id, { name: profile.name, profileUrl })
      }

      return this.userService.genToken(user)
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }

  async getLoginUrl() {
    return {
      loginUrl: `${this.baseUrl}/auth?app_id=${ZALO_APP_ID}&redirect_uri=${ZALO_REDIRECT_URI}`,
    }
  }

  async getAcessToken(oauthToken: string): Promise<string> {
    const response = await axios.get(`${this.baseUrl}/access_token`, {
      params: { ['app_id']: ZALO_APP_ID, ['app_secret']: ZALO_SECRET_KEY, code: oauthToken },
    })
    const accessToken = response.data.access_token
    return accessToken ? Promise.resolve(accessToken) : Promise.reject()
  }

  async getProfile(accessToken: string): Promise<IZaloProfile> {
    const response = await axios.get(`${this.graphUrl}/me`, {
      params: { ['access_token']: accessToken, fields: 'id,birthday,name,gender,picture' },
    })

    const id = response.data.id

    return id ? Promise.resolve(response.data) : Promise.reject()
  }
}
