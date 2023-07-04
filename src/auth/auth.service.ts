import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { type RegisterDto } from '@/auth/dto'
import { User, type UserDocument } from '@/schemas'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async register(data: RegisterDto) {
    try {
      return await this.UserModel.create(data)
    } catch (error) {
      throw new HttpException(
        error.response ?? {
          status: 'Error',
          error: error.message
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
