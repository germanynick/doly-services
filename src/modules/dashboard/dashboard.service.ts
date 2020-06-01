import { filter } from 'lodash'

import { DataQueryDto } from '@core/dto'
import { CustomerEntity } from '@core/entities'
import { CustomerType, Gender } from '@core/enums'
import { CustomerService } from '@modules/customer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DashboardService {
  constructor(private readonly customerService: CustomerService) {}

  async getCustomerChart() {
    const { data: customers } = await this.customerService.list(new DataQueryDto<CustomerEntity>())

    const results = Object.entries(CustomerType).map(([name, value]) => {
      const all = filter(customers, { type: value })
      const male = filter(all, { gender: Gender.Male })
      const female = filter(all, { gender: Gender.Female })

      return {
        name,
        male: male.length,
        female: female.length,
      }
    })

    return results
  }
}
