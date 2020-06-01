import * as csurf from 'csurf'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { JwtAuthGuard } from '@core/guards'
import { exceptionFactory } from '@core/validators'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // TODO: Enable Security
  // app.enableCors()
  // app.use(helmet())
  // app.use(csurf())
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // )

  app.setGlobalPrefix('/api')
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory, whitelist: true, transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(3001)
}

bootstrap()
