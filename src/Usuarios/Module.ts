import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './Controller';
import { User } from './Model';
import { UserService } from './Service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../JWT/Jwt.stratergy';

dotenv.config({ path: '.env' });

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    exports: [SequelizeModule],
    providers: [UserService, JwtStrategy], // Para que implemente el JWT para traer perfil de usaurio!!!!
    controllers: [UserController],
})
export class UsersModule {}
