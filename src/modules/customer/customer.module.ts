import { CustomerEntity } from '@core/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CustomerController } from './customer.controller'
import { CustomerRepository } from './customer.repository'
import { CustomerService } from './customer.service'

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerRepository])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
