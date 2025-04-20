import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({...createUserDto, hash: createUserDto.password})
    const role = await this.rolesService.findOneByValue('USER')
    if (role) {
      await user.$set('roles', [role.id])
      return user
    }
    throw new InternalServerErrorException()
  }

  async findAll() {
    return await this.userRepository.findAll({include: {all: true}})
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findOne({where: {email: addRoleDto.email}});
    const role = await this.rolesService.findOneByValue(addRoleDto.roleValue);
    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new BadRequestException('Пользователь или роль не найдены');
  }
}

