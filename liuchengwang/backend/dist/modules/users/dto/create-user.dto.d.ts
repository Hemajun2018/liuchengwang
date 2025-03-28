import { UserRole } from '../entities/user.entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    realName: string;
    email?: string;
    phone?: string;
    role: UserRole;
}
