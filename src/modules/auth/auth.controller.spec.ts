import { Test, type TestingModule } from '@nestjs/testing'

import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  it('should return "Hello World!"', () => {
    const result = 'Hello World!'

    jest.spyOn(service, 'getHello').mockImplementation(() => result)

    expect(controller.getHello()).toBe(result)
  })
})
