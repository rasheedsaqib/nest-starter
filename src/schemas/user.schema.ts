import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

export type UserDocument = Document & User

@Schema({
  timestamps: true
})
export class User {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  email: string

  @Prop({ required: true, type: String })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
