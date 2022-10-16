import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from './Controller';
import { User } from './Model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async registar(createUser: CreateUser): Promise<User> {
        const { nombre, email, password } = createUser;
        const usuario = await this.userModel.create({
            nombre,
            email,
            password,
        });
        return usuario;
    }

    getUsers(): string {
        return 'Hola desde el get user de /users';
    }
}
