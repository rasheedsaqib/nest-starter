import { getModelToken } from '@nestjs/mongoose'
import { connection, type Model } from 'mongoose'

export const createModelStub = async ({
  name,
  schema
}: {
  name: string
  schema: any
}) => {
  const model = connection.model(name, schema) as Model<any>

  return {
    provide: getModelToken(name),
    useValue: model
  }
}
