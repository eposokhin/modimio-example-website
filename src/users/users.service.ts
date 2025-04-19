import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
// import { User, UserCreationAttrs } from './users.model';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User) private userRepository: typeof User) {}
  constructor(
    private readonly entityManager: EntityManager,
    // @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    // const user = await this.userRepository.create(createUserDto as UserCreationAttrs)
    // return user

    const user = new User(createUserDto)
    return await this.entityManager.save(user)

  }

  async findAll() {
    return await this.entityManager.find(User)
    // return await this.usersRepository.find()
  }

  // findOne(id: number) {
  //   return await this.entityManager.findOne()
  //   return `This action returns a #${id} user`;
  // }

}

