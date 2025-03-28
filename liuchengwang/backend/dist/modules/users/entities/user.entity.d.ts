export declare enum UserRole {
    ADMIN = "admin",
    EMPLOYEE = "employee"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    realName: string;
    email?: string;
    phone?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
