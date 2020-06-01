import { Controller, Get } from '@nestjs/common'

import { DashboardService } from './dashboard.service'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get('/customer-chart')
  getCustomerChart() {
    return this.service.getCustomerChart()
  }
}
