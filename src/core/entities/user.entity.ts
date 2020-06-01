import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { nanoid } from 'nanoid'
import { BeforeInsert, Column, Entity } from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  email: string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column({ nullable: true })
  profileUrl: string

  @Column()
  @Exclude()
  salt: string

  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password || nanoid(), this.salt)
  }
}
