import { Body, Controller, Get, Post } from '@nestjs/common';
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
    getUsers(): string {
        return this.userService.getUsers();
    }
}
