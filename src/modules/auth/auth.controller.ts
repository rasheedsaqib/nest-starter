import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post
} from '@nestjs/common'

import { AuthService } from '@/modules/auth/auth.service'
import { RegisterDto } from '@/modules/auth/dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      const previousUserWithEmail = await this.authService.findUserByEmail(
        body.email
      )

      if (previousUserWithEmail != null) {
        throw new HttpException(
          {
            status: 'Error',
            message: 'A user with this email already exists'
          },
          HttpStatus.BAD_REQUEST
        )
      }

      const previousUserWithPhone = await this.authService.findUserByPhone(
        body.phone
      )

      if (previousUserWithPhone != null) {
        throw new HttpException(
          {
            status: 'Error',
            message: 'A user with this phone already exists'
          },
          HttpStatus.BAD_REQUEST
        )
      }

      const user = await this.authService.createUser(body)

      return {
        status: 'Success',
        message: 'User created successfully',
        data: user
      }
    } catch (error) {
      this.logger.error(error)

      throw new HttpException(
        error.response ?? {
          status: 'Error',
          message: error.message
        },
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
