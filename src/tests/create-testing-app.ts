import { ValidationPipe } from '@nestjs/common'
import { type ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface'
import { Test, type TestingModule } from '@nestjs/testing'

import {
  UnauthorizedExceptionFilter,
  ValidationExceptionFilter
} from '@/filters'

export const createTestingApp = async (metadata: ModuleMetadata) => {
  const module: TestingModule = await Test.createTestingModule(
    metadata
  ).compile()

  const app = module.createNestApplication()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new UnauthorizedExceptionFilter()
  )

  return app
}
