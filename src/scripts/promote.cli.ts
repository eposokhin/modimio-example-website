import { NestFactory } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { AppModule } from '../app.module';
import { Command } from 'commander';
import { AddRoleDto } from 'src/users/dto/add-role.dto';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const userService = appContext.get(UsersService);
  
  const program = new Command();
  
  program
    .version('1.0.0')
    .requiredOption('-e, --email <userId>', 'User email')
    .action(async (options) => {
      try {
        const addRoleDto = new AddRoleDto()
        addRoleDto.email = options.email
        addRoleDto.roleValue = 'Admin'
        console.log(addRoleDto)

        await userService.addRole(addRoleDto);
        console.log('User promoted to Admin successfully');
        await appContext.close();
        process.exit(0);
      } catch (error) {
        console.error('Error:', error.message);
        await appContext.close();
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

bootstrap();