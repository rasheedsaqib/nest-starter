import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { type RegisterDto } from '@/modules/auth/dto'
import { User, type UserDocument } from '@/schemas'
import { type Document } from '@/types'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async findUserByEmail(email: string) {
    return this.UserModel.findOne({
      email
    }).lean() as Promise<Document<User> | null>
  }

  async findUserByPhone(phone: string) {
    return this.UserModel.findOne({
      phone
    }).lean() as Promise<Document<User> | null>
  }

  async createUser(user: RegisterDto) {
    return this.UserModel.create({
      ...user,
      email_verified: false,
      phone_verified: false
    }) as unknown as Promise<Document<User>>
  }
}
