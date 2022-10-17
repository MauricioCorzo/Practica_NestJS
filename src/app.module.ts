import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './Usuarios/Model';
import { UsersModule } from './Usuarios/Module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db: SequelizeModuleOptions & SequelizeModule = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    native: false,
    models: [User],
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false },
    retryAttempts: 3,
};

@Module({
    imports: [SequelizeModule.forRoot(db), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
