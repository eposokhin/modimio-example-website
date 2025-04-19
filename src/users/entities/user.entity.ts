
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false
  })
  login: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: false,
    
  })
  password: string;
  
  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
