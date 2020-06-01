import { CustomerType, Gender } from '@core/enums'
import { IsDefined, IsEmail, IsEnum, IsOptional, IsPhoneNumber } from '@core/validators'

export class CustomerCreateDto {
  @IsDefined()
  name: string

  @IsEnum(CustomerType)
  type: CustomerType

  @IsDefined()
  @IsEmail()
  email: string

  @IsDefined()
  @IsEnum(Gender)
  gender: Gender

  @IsOptional()
  balance: number

  @IsOptional()
  @IsPhoneNumber()
  phone?: string

  @IsOptional()
  address: string
}

export class CustomerUpdateDto {
  @IsDefined()
  name: string

  @IsEnum(CustomerType)
  type: CustomerType

  @IsDefined()
  balance: number

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsDefined()
  address: string

  @IsEnum(Gender)
  gender: Gender
}
