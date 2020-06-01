import { Column, Entity } from 'typeorm'

import { CustomerType, Gender } from '@core/enums'

import { BaseEntity } from './base.entity'

@Entity('Customer')
export class CustomerEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  gender: Gender

  @Column()
  type: CustomerType

  @Column({ nullable: true })
  balance: number

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  accountNumber?: string
}
