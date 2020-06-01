import { IsNotEmpty } from '@core/validators'

export class LoginDto {
  @IsNotEmpty()
  oauthToken: string
}

export interface IZaloProfile {
  id: string
  name: string
  picture: {
    data: { url: string }
  }
  birthday: string
}
