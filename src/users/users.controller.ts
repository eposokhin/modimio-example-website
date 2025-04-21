import { Controller, Get, UseGuards, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Admin')
  @Get()
  findAll(@Query('page') page = 1, @Query('usersPerPage') usersPerPage = 10) {
    return this.usersService.findAll(page, usersPerPage);
  }
}
