import { Repository, EntityRepository } from 'typeorm'
import { UserEntity } from '@core/entities'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
