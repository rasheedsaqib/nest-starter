import { Test, type TestingModule } from '@nestjs/testing'

import { AuthService } from '@/modules/auth/auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return "Hello World!"', () => {
    const result = 'Hello World!'

    expect(service.getHello()).toBe(result)
  })
})
