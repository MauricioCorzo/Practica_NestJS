import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    Default,
    IsUUID,
} from 'sequelize-typescript';

@Table
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    nombre: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    token: string;

    @Column(DataType.BOOLEAN)
    confirmado: boolean;
}
