import {Controller, Post, Get, Put, Body, Param, Res} from '@nestjs/common'
import { AuthService } from './auth.services';
import { UserDto } from './dto/user.dto';
import { IUserLogin } from './interface/user.interface';

@Controller('auth')

export class AuthController {
    
        constructor(private userService: AuthService) {}

    @Post('c')
    async register(@Body() userDto: UserDto): Promise<UserDto> {
        const create = this.userService.register(userDto)
        return create
    }

    @Post('')
    async login(@Body() user: IUserLogin, @Res() res: Response): Promise<IUserLogin> {
        const login = await this.userService.login(user, res)
        return login
    }

    async getById() {}

    async getAll() {}

    @Put(':id')
    async update(@Body() userDto: UserDto, @Param('id') id: string): Promise<UserDto> {
        const update = await this.userService.update(id,userDto)
        return update
    }

    async delete() {}

}