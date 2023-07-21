import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection } from 'mongoose'

let mongodb: MongoMemoryServer

beforeAll(async () => {
  mongodb = await MongoMemoryServer.create()
  const uri = mongodb.getUri()
  await connect(uri)
})

afterEach(async () => {
  jest.resetAllMocks()
})

afterAll(async () => {
  await connection.dropDatabase()
  await connection.close()
  await mongodb.stop()
})
