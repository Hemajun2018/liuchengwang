import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 创建新用户
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: Partial<User> }> {
    console.log('开始登录验证:', {
      username: loginDto.username,
      password: loginDto.password
    });

    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      console.log('用户不存在:', loginDto.username);
      throw new UnauthorizedException('用户名或密码不正确');
    }

    console.log('找到用户:', {
      username: user.username,
      storedHash: user.password
    });

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    console.log('密码验证结果:', {
      inputPassword: loginDto.password,
      storedHash: user.password,
      isValid: isPasswordValid
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码不正确');
    }

    // 生成JWT令牌
    const payload = { 
      id: user.id,
      username: user.username,
      role: user.role 
    };
    
    const token = this.jwtService.sign(payload);
    console.log('登录成功，生成token');

    // 返回令牌和用户信息（不包含密码）
    const { password, ...result } = user;
    return {
      token,
      user: result,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findAll(params: {
    page: number;
    pageSize: number;
    keyword?: string;
    role?: string;
  }) {
    const { page, pageSize, keyword, role } = params;
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (keyword) {
      queryBuilder.where(
        '(user.username LIKE :keyword OR user.realName LIKE :keyword OR user.email LIKE :keyword OR user.phone LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return {
      items: items.map(item => {
        const { password, ...rest } = item;
        return rest;
      }),
      total,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // 更新用户信息
    Object.assign(user, updateUserDto);
    
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.findOne(id);
    
    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('旧密码不正确');
    }
    
    // 更新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    await this.userRepository.save(user);
  }

  async updateRole(id: number, role: string): Promise<User> {
    const user = await this.findOne(id);
    
    // 更新角色
    user.role = role as UserRole;
    
    return this.userRepository.save(user);
  }
} 