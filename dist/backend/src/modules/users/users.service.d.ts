import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: Partial<User>;
    }>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    findAll(params: {
        page: number;
        pageSize: number;
        keyword?: string;
        role?: string;
    }): Promise<{
        items: {
            id: number;
            username: string;
            role: UserRole;
            realName: string;
            email?: string;
            phone?: string;
            avatar?: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    updateRole(id: number, role: string): Promise<User>;
}
