import { Transform } from 'class-transformer'
import { isEmpty, toNumber } from 'lodash'
import { FindManyOptions, FindOneOptions } from 'typeorm'

import { BaseEntity } from '@core/entities'
import { IsOptional } from '@core/validators'

export class DataQueryDto<TEntity extends BaseEntity = any> {
  @IsOptional()
  @Transform(value => toNumber(value))
  offset?: number

  @IsOptional()
  @Transform(value => toNumber(value))
  limit?: number

  @IsOptional()
  filters?: Partial<TEntity>

  @IsOptional()
  search?: string

  @IsOptional()
  fields?: (keyof TEntity)[]

  @IsOptional()
  order?: { [P in keyof TEntity]?: 'ASC' | 'DESC' }

  get findOneOptions() {
    const options: FindOneOptions<TEntity> = {}

    if (!isEmpty(this.filters)) {
      options.where = this.filters
    }

    if (!isEmpty(this.order)) {
      options.order = this.order
    } else {
      options.order = { createdAt: 'DESC' }
    }

    if (!isEmpty(this.fields)) {
      options.select = this.fields
    }

    return options
  }

  get findManyOptions() {
    const options: FindManyOptions<TEntity> = this.findOneOptions

    if (this.offset) {
      options.skip = this.offset
      options.take = 50
    }

    if (this.limit) {
      options.take = this.limit
    }

    return options
  }

  get countOptions() {
    return this.findOneOptions
  }
}

export class DataPagination<TEntity = any> {
  total: number
  limit: number
  offset: number
  data: TEntity[]
}
