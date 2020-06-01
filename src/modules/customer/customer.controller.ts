import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerCreateDto, CustomerUpdateDto } from './customer.dto'
import { DataQueryDto } from '@core/dto'

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Put()
  list(@Body() dataQuery: DataQueryDto) {
    return this.service.list(dataQuery)
  }

  @Get('/:id')
  get(@Param('id') id: string, @Query() dataQuery?: DataQueryDto) {
    return this.service.get(id, dataQuery)
  }

  @Post()
  create(@Body() data: CustomerCreateDto) {
    return this.service.create(data)
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: CustomerUpdateDto) {
    return this.service.update(id, data)
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id)
  }
}
