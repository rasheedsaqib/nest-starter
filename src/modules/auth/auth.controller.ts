import { Controller, Get } from '@nestjs/common'

import { AuthService } from '@/modules/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello()
  }
}
