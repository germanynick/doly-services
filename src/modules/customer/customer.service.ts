import { plainToClass } from 'class-transformer'

import { DataPagination, DataQueryDto } from '@core/dto'
import { CustomerEntity } from '@core/entities'
import { ErrorCode } from '@core/enums'
import { BadRequestException, Injectable } from '@nestjs/common'

import { CustomerCreateDto, CustomerUpdateDto } from './customer.dto'
import { CustomerRepository } from './customer.repository'

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async list(dataQuery: DataQueryDto<CustomerEntity>) {
    const [total, data] = await Promise.all([
      this.repository.count(dataQuery.countOptions),
      this.repository.find(dataQuery.findManyOptions),
    ])

    const pagination: DataPagination = {
      total,
      data,
      limit: dataQuery.limit,
      offset: dataQuery.offset,
    }

    const result: DataPagination<CustomerEntity> = plainToClass(DataPagination, pagination)
    return result
  }

  async get(id: string, dataQuery?: DataQueryDto<CustomerEntity>) {
    return this.repository.findOne(id, dataQuery.findOneOptions)
  }

  async create(createDto: CustomerCreateDto) {
    const entity = this.repository.create(createDto)
    return this.repository.save(entity)
  }

  async update(id: string, updateDto: CustomerUpdateDto) {
    const entity = await this.repository.findOne(id)

    if (!entity) {
      throw new BadRequestException({ message: ErrorCode.IsNotFound })
    }

    return this.repository.save({ ...entity, ...updateDto })
  }

  async delete(id: string) {
    return this.repository.softDelete(id)
  }
}
