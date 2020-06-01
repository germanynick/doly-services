import { IsEmail, IsNotEmpty, IsOptional } from '@core/validators'

export class UserCreateDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsEmail()
  email?: string

  @IsOptional()
  name?: string

  @IsOptional()
  profileUrl?: string
}

export class UserUpdateDto {
  @IsOptional()
  name?: string

  @IsOptional()
  profileUrl?: string
}
