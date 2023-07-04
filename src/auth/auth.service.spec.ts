import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, type Connection, type Model } from 'mongoose'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { AuthService } from '@/auth/auth.service'
import { UserFactory } from '@/factories/user.factory'
import { User, UserSchema } from '@/schemas'

describe('AuthService', () => {
  let service: AuthService
  let mongodb: MongoMemoryServer
  let connection: Connection
  let model: Model<User>

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create()
    const uri = mongodb.getUri()
    connection = (await connect(uri)).connection
    model = connection.model(User.name, UserSchema)

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: model
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
    await mongodb.stop()
  })

  afterEach(async () => {
    const collections = connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
  })

  it('given name, email and password: should create a new user', async () => {
    const populatedUser = UserFactory.createPopulatedUser()

    const user = await service.register(populatedUser)

    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('name', populatedUser.name)
    expect(user).toHaveProperty('email', populatedUser.email)
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('createdAt')
    expect(user).toHaveProperty('updatedAt')
  })
})
