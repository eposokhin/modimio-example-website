import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(4, 16)
    readonly login: string
    @IsEmail()
    readonly email: string
    @IsString()
    @Length(4, 32)
    readonly password: string
}
