import { getModelToken } from '@nestjs/mongoose'
import { connection } from 'mongoose'

export const createModelStub = async ({
  name,
  schema
}: {
  name: string
  schema: any
}) => {
  const model = connection.model(name, schema)

  return {
    provide: getModelToken(name),
    useValue: model
  }
}
