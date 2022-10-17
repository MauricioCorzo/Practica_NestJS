import { Column, Model, Table, DataType, AllowNull, PrimaryKey, Default, IsUUID, BeforeCreate, Scopes } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Scopes(() => ({
    eliminarPassword: {
        attributes: {
            exclude: ['password'],
        },
    },
}))
@Table({ modelName: 'User', tableName: 'User', timestamps: false })
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

    @BeforeCreate
    static hashPassword = async (usuario: User) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
    };

    verificarPassword = function (password: string) {
        return bcrypt.compareSync(password, this.password);
    };
}
