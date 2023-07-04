import { faker } from '@faker-js/faker'

import { type User } from '@/schemas'

export const UserFactory = {
  createPopulatedUser({
    name = faker.person.fullName(),
    email = faker.internet.email(),
    password = faker.lorem.word()
  }: Partial<User> = {}): User {
    return {
      name,
      email,
      password
    }
  }
}
