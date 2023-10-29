import {Injectable, Res} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { IUser, IUserLogin } from './interface/user.interface';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose';


@Injectable()

export class AuthService {

        constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async register(user: IUser): Promise<IUser>{
        const salt = 10
        const hash = await bcrypt.hash(user.password, salt)
        const {password, ...others} = user
        const create = await this.userModel.create({password: hash, ...others})
        
        return create
    }

    async login(user: IUserLogin, res: any): Promise<IUserLogin> {
        const login = await this.userModel.findOne({username: user.username})
        // console.log(login)
        if (!login) return res.status(401).json({status: "Failed", message: "Wrong_username", data: "False"})

        const checkPassword = await bcrypt.compareSync(user.password, login.password)
        // console.log(checkPassword)
        if (checkPassword == false) return res.status(401).json({status: "Failed", message: "Wrong_password", data: "False"})
        
        const {password, ...others} = login['_doc']

        const token = jwt.sign({
            id: login._id
        }, process.env.JWT, {expiresIn: "1d", algorithm: "HS256"})

        return res.status(200).json({status: "Success", message: "Login_success!", data: {...others, token}})
    }

    async getById() {}

    async getAll() {}

    async update(id: string, user: IUser): Promise<IUser> {
        const salt = 10
        const hash = await bcrypt.hash(user.password, salt)
        const {password, ...others} = user
        const update = await this.userModel.findByIdAndUpdate(id, {password: hash, ...others},  
            {new: true,
            runValidator: true})
        console.log({password: hash,  ...others})
        return update
    }

    async delete() {}


}