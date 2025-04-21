import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto)
    return this.generateToken(user)

  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findOne(createUserDto)
    if (candidate) {
      throw new BadRequestException('Пользователь с таким логином или email существует')
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 5)
    const user = await this.userService.create({ ...createUserDto, password: passwordHash })
    const token = this.generateToken(user)
    return token
  }

  async generateToken(user: User) {
    const payload = { login: user.login, email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const credentials = {
      email: loginUserDto.loginOrEmail,
      login: loginUserDto.loginOrEmail,
      password: loginUserDto.password
    }
    const user = await this.userService.findOne(credentials)
    if (!user) {
      throw new BadRequestException('Такого пользователя не существует')
    }
    const hasSamePassword = await bcrypt.compare(loginUserDto.password, user.dataValues.hash)
    if (hasSamePassword) {
      return user
    }

    throw new UnauthorizedException('Неверный логин, email или пароль')

  }

  async getUserRolesById(id: number) {
    return await this.userService.getUserRolesById(id)
  }
}
