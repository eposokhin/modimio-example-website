import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

export interface RoleCreationAttrs {
    value: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    value: string

    @BelongsToMany(() => User, () => UserRoles)
    user: User[]
}   