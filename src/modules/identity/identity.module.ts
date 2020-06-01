import { UserEntity } from '@core/entities'
import { JWT_EXPIRED_IN, JWT_SECRET_KEY } from '@core/env.config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController, AuthService, JwtStrategy } from './auth'
import { UserRepository, UserService } from './user'
import { ZaloController, ZaloService } from './zalo'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRED_IN },
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  controllers: [AuthController, ZaloController],
  providers: [UserService, AuthService, ZaloService, JwtStrategy],
})
export class IdentityModule {}
