import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE
  })
  role: UserRole;

  @Column({ name: 'real_name' })
  realName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 暂时注释掉项目关联，后续实现项目模块时再添加
  // @OneToMany(() => Project, project => project.owner)
  // projects: Project[];
} 