import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './Controller';
import { User } from './Model';
import { UserService } from './Service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    exports: [SequelizeModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UsersModule {}
