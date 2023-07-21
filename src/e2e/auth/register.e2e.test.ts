import { type INestApplication, Logger } from '@nestjs/common'
import { type Model } from 'mongoose'
import * as request from 'supertest'

import { createPopulatedUser } from '@/factories'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { User, UserSchema } from '@/schemas'
import { createModelStub } from '@/tests/create-model.stub'
import { createTestingApp } from '@/tests/create-testing-app'

describe('POST /register', () => {
  let app: INestApplication
  let model: Model<User>

  beforeAll(async () => {
    const stub = await createModelStub({
      name: User.name,
      schema: UserSchema
    })

    model = stub.useValue

    app = await createTestingApp({
      controllers: [AuthController],
      providers: [AuthService, stub, Logger]
    })

    await app.init()
  })

  it('given invalid body: should throw bad request exception', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .expect(400)
      .expect({
        status: 'ValidationError',
        message: {
          name: ['name must be a string', 'name should not be empty'],
          email: ['email must be an email', 'email should not be empty'],
          phone: ['phone must be a string', 'phone should not be empty'],
          password: [
            'password must be a string',
            'password should not be empty'
          ]
        }
      })
  })

  it('given an email that is already used: should throw bad request exception', async () => {
    const user = createPopulatedUser()

    await model.create(user)

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(400)
      .expect({
        status: 'Error',
        message: 'A user with this email already exists'
      })
  })

  it('given a phone that is already used: should throw bad request exception', async () => {
    const user1 = createPopulatedUser()
    const user2 = createPopulatedUser({
      phone: user1.phone
    })

    await model.create(user1)

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user2)
      .expect(400)
      .expect({
        status: 'Error',
        message: 'A user with this phone already exists'
      })
  })

  it('given valid body: should return 201', async () => {
    const user = createPopulatedUser()

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect(({ body: { status, message, data } }) => {
        expect(status).toBe('Success')
        expect(message).toBe('User created successfully')

        expect(data.name).toBe(user.name)
        expect(data.email).toBe(user.email)
        expect(data.phone).toBe(user.phone)
        expect(data.email_verified).toBe(false)
        expect(data.phone_verified).toBe(false)
        expect(typeof data._id).toBe('string')
        expect(typeof data.password).toBe('string')
        expect(typeof data.created_at).toBe('string')
        expect(typeof data.updated_at).toBe('string')
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
