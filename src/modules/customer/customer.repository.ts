import { Repository, EntityRepository } from 'typeorm'
import { CustomerEntity } from '@core/entities'

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {}
