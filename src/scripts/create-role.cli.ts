import { NestFactory } from '@nestjs/core';
import { RolesService } from '../roles/roles.service';
import { AppModule } from '../app.module';
import { Command } from 'commander';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const roleService = appContext.get(RolesService);
  
  const program = new Command();

  program
    .version('1.0.0')
    .requiredOption('-r, --role <role>', 'Roles to add')
    .action(async (options) => {
      console.log(options)
      try {
        const createRoleDto = new CreateRoleDto()
        createRoleDto.value = options.role

        await roleService.create(createRoleDto);
        console.log('Role created successfully');
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