// 用户相关类型
export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  role?: 'admin' | 'employee';
  realName?: string;
  email?: string;
  phone?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
  realName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// API响应类型
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  statusCode?: number;
  error?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Node {
  id: number;
  name: string;
  description?: string;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface Issue {
  id: number;
  title: string;
  description?: string;
  status: 'open' | 'closed';
  node: Node;
  createdAt: Date;
  updatedAt: Date;
}

export interface Material {
  id: number;
  name: string;
  description?: string;
  fileUrl: string;
  node: Node;
  createdAt: Date;
  updatedAt: Date;
} 