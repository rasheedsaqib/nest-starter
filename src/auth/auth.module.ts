import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { User, UserSchema } from '@/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
