import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.create(createRoleDto)
  }

  async findOneByValue(value: string) {
    return await this.roleRepository.findOne({where: {value}})
  }
}
