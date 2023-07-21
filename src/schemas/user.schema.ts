import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  email_verified: boolean

  @Prop({ required: true })
  phone_verified: boolean
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
