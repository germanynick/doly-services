import { Decorator } from '@core/enums'
import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata(Decorator.Public, true)
