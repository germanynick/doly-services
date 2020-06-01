import { CustomerModule } from '@modules/customer'
import { Module } from '@nestjs/common'

import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'

@Module({
  imports: [CustomerModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
