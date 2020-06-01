import { CustomerModule } from '@modules/customer'
import { DashboardModule } from '@modules/dashboard'
import { IdentityModule } from '@modules/identity'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), CustomerModule, IdentityModule, DashboardModule],
})
export class AppModule {}
