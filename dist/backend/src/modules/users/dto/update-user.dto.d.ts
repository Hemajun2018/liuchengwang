import { UserRole } from '../entities/user.entity';
export declare class UpdateUserDto {
    realName?: string;
    email?: string;
    phone?: string;
    role?: UserRole;
}
