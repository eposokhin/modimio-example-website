import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { User } from './users/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';

// const SequelizeConfig = SequelizeModule.forRoot({
//   dialect: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRESS_PORT),
//   username: process.env.POSTGRES_USER || 'postgres',
//   password: process.env.POSTGRESS_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   models: [User],
//   autoLoadModels: true,
//   synchronize: true
// })

const typeormConfig = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRESS_PORT'),
    username:  configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRESS_PASSWORD'),
    database:configService.getOrThrow('POSTGRES_DB'),
    synchronize: configService.getOrThrow('POSTGRESS_SYNCHRONIZE'),
    entities: [User],
    autoLoadEntities: true,
    logging: ['query', 'error', 'schema'],
  }),
  inject: [ConfigService]
})

@Module({
  imports: [UsersModule, AuthModule, RolesModule, typeormConfig, ConfigModule.forRoot({isGlobal: true})],
  controllers: [],
  providers: [],
})
export class AppModule { 
  constructor(private dataSource: DataSource) {}
}
