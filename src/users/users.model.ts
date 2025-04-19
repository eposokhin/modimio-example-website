import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface UserCreationAttrs {
    login: string
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    login: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

}