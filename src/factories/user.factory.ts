import { faker } from '@faker-js/faker'

import { type User } from '@/schemas'
import { type Document } from '@/types'

export const createPopulatedUser = ({
  _id = faker.database.mongodbObjectId(),
  name = faker.person.fullName(),
  email = faker.internet.email(),
  phone = faker.phone.number(),
  password = faker.lorem.word(),
  email_verified = faker.datatype.boolean(),
  phone_verified = faker.datatype.boolean(),
  created_at = faker.date.past(),
  updated_at = faker.date.past()
}: Partial<Document<User>> = {}): Document<User> => {
  return {
    _id,
    name,
    email,
    phone,
    password,
    email_verified,
    phone_verified,
    created_at,
    updated_at
  }
}
