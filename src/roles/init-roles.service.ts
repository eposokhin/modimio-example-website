import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class InitRolesService implements OnModuleInit {
  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

  async onModuleInit() {
    await this.populateRoles();
  }

  private async populateRoles() {
    try {
      const defaultRoles = [
        { value: 'Admin' },
        { value: 'User' },
      ];

      const existingRoles = await this.roleRepository.findAll({
        where: {
          value: ['Admin', 'User'],
        },
      });

      if (existingRoles.length === 0) {
        await this.roleRepository.bulkCreate(defaultRoles);
        console.log('Default roles have been created.');
      } else {
        console.log('Default roles already exist.');
      }
    } catch (error) {
      console.error('Error populating roles:', error);
    }
  }
}
