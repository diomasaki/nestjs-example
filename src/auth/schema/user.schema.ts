import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {HydratedDocument} from 'mongoose'

export type UserDoc = HydratedDocument<User>

@Schema({timestamps: true})

export class User {

    @Prop({required: true})
    readonly username: string;

    @Prop({required: true})
    readonly password: string;

    @Prop({required: true, unique: true})
    readonly email: string;

    @Prop({required: true, unique: true})
    readonly phone: number;

}

export const UserSchema = SchemaFactory.createForClass(User)