import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './models/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UserRoles } from './models/user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ]
})
export class RolesModule { }