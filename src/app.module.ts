import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './Usuarios/Model';
import { UsersModule } from './Usuarios/Module';

const db: SequelizeModuleOptions & SequelizeModule = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '11121314Mc',
    database: 'nestjs',
    logging: false,
    native: false,
    models: [User],
    autoLoadModels: true,
    synchronize: true,
    sync: { force: true },
    retryAttempts: 3,
};

@Module({
    imports: [SequelizeModule.forRoot(db), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
