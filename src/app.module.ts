import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.model';

const SequelizeConfig = SequelizeModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    dialect: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRESS_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRESS_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    // models: [User],
    autoLoadModels: true,
    synchronize: true
  }),
  inject: [ConfigService]
})

@Module({
  imports: [UsersModule, AuthModule, RolesModule, SequelizeConfig, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
