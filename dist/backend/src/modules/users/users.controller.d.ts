import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page?: number, pageSize?: number, keyword?: string, role?: string): Promise<{
        items: {
            id: number;
            username: string;
            role: import("./entities/user.entity").UserRole;
            realName: string;
            email?: string;
            phone?: string;
            avatar?: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        role: import("./entities/user.entity").UserRole;
        realName: string;
        email?: string;
        phone?: string;
        avatar?: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: Partial<import("./entities/user.entity").User>;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        role: import("./entities/user.entity").UserRole;
        realName: string;
        email?: string;
        phone?: string;
        avatar?: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: number;
        username: string;
        role: import("./entities/user.entity").UserRole;
        realName: string;
        email?: string;
        phone?: string;
        avatar?: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    updateRole(id: string, role: string): Promise<import("./entities/user.entity").User>;
}
