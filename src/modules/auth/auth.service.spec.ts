import { Test, type TestingModule } from '@nestjs/testing'
import { type Model } from 'mongoose'

import { createPopulatedUser } from '@/factories'
import { AuthService } from '@/modules/auth/auth.service'
import { User, UserSchema } from '@/schemas'
import { createModelStub } from '@/tests/create-model.stub'

describe('AuthService', () => {
  let service: AuthService
  let model: Model<User>

  beforeAll(async () => {
    const stub = await createModelStub({
      name: User.name,
      schema: UserSchema
    })

    model = stub.useValue

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, stub]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('service and model should be defined', () => {
    expect(service).toBeDefined()
    expect(model).toBeDefined()
  })

  it('given an invalid email: should return null', async () => {
    const user = createPopulatedUser()

    const result = await service.findUserByEmail(user.email)

    expect(result).toBeNull()
  })

  it('given a valid email: should return a user', async () => {
    const user = createPopulatedUser()

    await model.create(user)

    const result = await service.findUserByEmail(user.email)

    expect(result).toBeDefined()
    expect(result).not.toBeNull()
  })

  it('given an invalid phone: should return null', async () => {
    const user = createPopulatedUser()

    const result = await service.findUserByPhone(user.phone)

    expect(result).toBeNull()
  })

  it('given a valid phone: should return a user', async () => {
    const user = createPopulatedUser()

    await model.create(user)

    const result = await service.findUserByPhone(user.phone)

    expect(result).toBeDefined()
    expect(result).not.toBeNull()
  })

  it("given a user's data: should create a user", async () => {
    const user = createPopulatedUser()

    const result = await service.createUser(user)

    expect(result).toBeDefined()
    expect(result).not.toBeNull()
    expect(result).toHaveProperty('_id')
    expect(result).toHaveProperty('name', user.name)
    expect(result).toHaveProperty('email', user.email)
    expect(result).toHaveProperty('phone', user.phone)
    expect(result).toHaveProperty('password')
    expect(result).toHaveProperty('created_at')
    expect(result).toHaveProperty('updated_at')
  })
})
