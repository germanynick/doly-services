import * as faker from 'faker'
import { times } from 'lodash'
import { MigrationInterface, QueryRunner } from 'typeorm'

import { CustomerEntity, UserEntity } from '@core/entities'
import { CustomerType, Gender } from '@core/enums'

export class SeedData1590942682787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(UserEntity)

    const users = userRepo.create([
      { name: 'Admin', username: 'admin', password: 'admin' },
      { name: 'Duc Pham', username: 'ducpham', password: 'ducpham' },
    ])

    await userRepo.save(users)

    const customerRepo = queryRunner.manager.getRepository(CustomerEntity)
    const customers = times<Partial<CustomerEntity>>(100, () => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      balance: faker.random.number(),
      gender: faker.random.boolean() ? Gender.Male : Gender.Female,
      phone: faker.phone.phoneNumber('+84#########'),
      type: faker.random.arrayElement(Object.values(CustomerType)),
      accountNumber: faker.finance.account(),
      status: faker.hacker.adjective(),
    }))

    await customerRepo.save(customers)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
