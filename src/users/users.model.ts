import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/models/roles.model";
import { UserRoles } from "src/roles/models/user-roles.model";

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
    passwordHash: string
    
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}