import { keyBy, mapValues, first, values } from 'lodash'
import { ValidationError } from 'class-validator'
import { BadRequestException } from '@nestjs/common'

export const exceptionFactory = (errors: ValidationError[]) => {
  const temp = keyBy(errors, 'property')
  const details = mapValues(temp, error => first(values(error.constraints)))

  throw new BadRequestException({ errors: details })
}
