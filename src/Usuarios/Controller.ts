import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { User } from './Model';
import { UserService } from './Service';

export class CreateUser {
    id: string;

    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @Length(8)
    password: string;
    token?: string;
    confirmado?: boolean;
}

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    registrar(@Body() createUser: CreateUser): Promise<User> {
        return this.userService.registar(createUser);
    }

    @Get()
    allUsers(): Promise<CreateUser[]> {
        return this.userService.allUsers();
    }

    @Get('confirmar/:token')
    confirmar(@Param('token') token: string) {
        return this.userService.confirmar(token);
    }

    @Post('login')
    getpassword(
        @Body() usuario: Pick<CreateUser, 'email' | 'password'>
    ): Promise<boolean> {
        return this.userService.getPassword(usuario);
    }
}
