import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { JwtGuardian } from '../JWT/Jwt-guardian';
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

export class LoginUser {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;
}

export type Token = {
    token: string;
};

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
    login(@Body() usuario: LoginUser): Promise<Token> {
        return this.userService.login(usuario);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuardian)
    @Get('perfil')
    perfil(@Request() req): CreateUser {
        return req.user;
    }

    @Get(':id')
    getUser(@Param('id') id: string): Promise<CreateUser> {
        return this.userService.getUser(id);
    }
}
