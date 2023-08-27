import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cpf: string;

  @Prop()
  sex: string;

  @Prop()
  birth: string;

  @Prop()
  role: string;

  @Prop()
  otp: string;

  @Prop()
  emailVerifed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);