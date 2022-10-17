import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { generarId } from 'src/helpers/generarId';
import { CreateUser, LoginUser } from './Controller';
import { User } from './Model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService) {}

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
        return await this.userModel.scope('eliminarPassword').findAll();
    }

    async getUser(id: string): Promise<CreateUser> {
        const usuario = await this.userModel.findByPk(id);

        if (!usuario) {
            throw new HttpException('Id inexistente o Incorrecto', 400);
        }

        return usuario;
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

    async login(usuario: Pick<CreateUser, 'email' | 'password'>): Promise<LoginUser> {
        const { email, password } = usuario;

        const usuarioLogin = await this.userModel.findOne({ where: { email: email } });

        if (!usuarioLogin) {
            throw new HttpException('Usuario no encontrado', 404);
        }

        if (!usuarioLogin.verificarPassword(password)) {
            throw new HttpException('Contraseña incorrecta', 403);
        }

        if (!usuarioLogin.confirmado) {
            throw new HttpException('Tu cuenta no ha sido confirmada aun', 403);
        }

        const token = this.jwtService.sign({ id: usuarioLogin.id, nombre: usuarioLogin.nombre, email: usuarioLogin.email });

        const user: LoginUser = {
            // user: usuarioLogin,
            token: token,
        };

        return user;
    }
}
