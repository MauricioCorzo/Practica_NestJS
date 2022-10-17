import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generarId } from 'src/helpers/generarId';
import { CreateUser } from './Controller';
import { User } from './Model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async registar(createUser: CreateUser): Promise<User> {
        const { nombre, email, password } = createUser;

        const existeUsuario = await this.userModel.findOne({
            where: { email: email },
        });

        if (existeUsuario) {
            throw new HttpException('Usuario ya registrado', 400); // Igual a res.status(400).send('Usuario ya Registrado')
        }

        try {
            const usuario = await this.userModel.create({
                nombre,
                email,
                password,
                token: generarId(),
                confirmado: false,
            });
            return usuario;
        } catch (error) {
            console.log(error);
        }
    }

    async allUsers(): Promise<CreateUser[]> {
        return await this.userModel.findAll();
    }

    async confirmar(token: string) {
        const usuarioConfirmar = await this.userModel.findOne({
            where: { token: token },
        });

        if (!usuarioConfirmar) {
            throw new HttpException('Token no valido', 404);
        }
        try {
            usuarioConfirmar.token = null;
            usuarioConfirmar.confirmado = true;
            await usuarioConfirmar.save();

            return 'Usuario confirmado correctamente';
        } catch (error) {
            console.log(error);
        }
    }

    async getPassword(
        usuario: Pick<CreateUser, 'email' | 'password'>
    ): Promise<boolean> {
        const { email, password } = usuario;

        const usuarioOtro = await this.userModel.findOne({
            where: { email: email },
        });

        return usuarioOtro.verificarPassword(password);
    }
}
