import * as validator from 'class-validator'
import { ErrorCode } from '@core/enums'

export * from 'class-validator'

export const IsDefined = (options: validator.ValidationOptions = {}) =>
  validator.IsDefined({ ...options, message: ErrorCode.IsDefined })

export const IsPhoneNumber = (options: validator.ValidationOptions = {}) =>
  validator.IsPhoneNumber('ZZ', options)

export const IsEmail = (options: validator.ValidationOptions = {}) =>
  validator.IsEmail(undefined, { ...options, message: ErrorCode.IsDefined })
