import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE
  })
  role: UserRole;

  @Column({ length: 50, nullable: true, name: 'real_name' })
  realName: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 