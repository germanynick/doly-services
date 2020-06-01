import { Exclude } from 'class-transformer'
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date
}
