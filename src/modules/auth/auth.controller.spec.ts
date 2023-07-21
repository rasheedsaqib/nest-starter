import { Logger } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'

import { createPopulatedUser } from '@/factories'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { User, UserSchema } from '@/schemas'
import { createModelStub } from '@/tests/create-model.stub'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeAll(async () => {
    const stub = await createModelStub({
      name: User.name,
      schema: UserSchema
    })

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, stub, Logger]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('given an email that is already used: should throw bad request exception', async () => {
    const user = createPopulatedUser()

    jest.spyOn(service, 'findUserByEmail').mockImplementation(async () => user)

    await expect(async () => {
      await controller.register(user)
    }).rejects.toEqual(
      expect.objectContaining({
        status: 400,
        message: 'A user with this email already exists'
      })
    )
  })

  it('given a phone that is already used: should throw bad request exception', async () => {
    const user = createPopulatedUser()

    jest.spyOn(service, 'findUserByEmail').mockImplementation(async () => null)

    jest.spyOn(service, 'findUserByPhone').mockImplementation(async () => user)

    await expect(async () => {
      await controller.register(user)
    }).rejects.toEqual(
      expect.objectContaining({
        status: 400,
        message: 'A user with this phone already exists'
      })
    )
  })

  it('given a valid user: should return the user created', async () => {
    const user = createPopulatedUser()

    jest.spyOn(service, 'findUserByEmail').mockImplementation(async () => null)

    jest
      .spyOn(service, 'findUserByPhone')
      .mockImplementationOnce(async () => null)
      .mockImplementationOnce(async () => user)

    jest.spyOn(service, 'createUser').mockImplementation(async () => user)

    const response = await controller.register(user)

    expect(response).toBeDefined()
    expect(response).toHaveProperty('message', 'User created successfully')
    expect(response).toHaveProperty('status', 'Success')

    expect(response.data).toHaveProperty('name', user.name)
    expect(response.data).toHaveProperty('email', user.email)
    expect(response.data).toHaveProperty('phone', user.phone)
    expect(response.data).toHaveProperty('password')
  })

  it('when an unexpected error is thrown: should throw internal server exception', async () => {
    const user = createPopulatedUser()

    jest.spyOn(service, 'findUserByEmail').mockImplementation(async () => null)

    jest
      .spyOn(service, 'findUserByPhone')
      .mockImplementationOnce(async () => null)
      .mockImplementationOnce(async () => user)

    jest
      .spyOn(service, 'createUser')
      .mockRejectedValueOnce(new Error('Database issue'))

    await expect(async () => {
      await controller.register(user)
    }).rejects.toEqual(
      expect.objectContaining({
        status: 500,
        message: 'Database issue'
      })
    )
  })
})
