import { IJwtPayload } from '@core/dto'
import { UserEntity } from '@core/entities'
import { ErrorCode } from '@core/enums'
import { JWT_EXPIRED_IN } from '@core/env.config'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserCreateDto, UserUpdateDto } from './user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository, private readonly jwtService: JwtService) {}

  async getByUsername(username: string) {
    return this.repository.findOne({ where: { username } })
  }

  async create(dto: UserCreateDto) {
    const userInDB = await this.repository.findOne({
      where: { username: dto.username },
    })

    if (userInDB) {
      throw new BadRequestException(ErrorCode.IsExisted)
    }

    const entity = this.repository.create(dto)

    return this.repository.save(entity)
  }

  async update(id: string, dto: UserUpdateDto) {
    const entity = await this.repository.findOne(id)

    if (!entity) {
      throw new BadRequestException({ message: ErrorCode.IsNotFound })
    }

    return this.repository.save({ ...entity, ...dto })
  }

  async genToken(user: UserEntity) {
    const payload: IJwtPayload = { userId: user.id, username: user.username }

    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken,
      expiredIn: JWT_EXPIRED_IN,
    }
  }
}
