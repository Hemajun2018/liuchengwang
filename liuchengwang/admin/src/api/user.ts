import request from '../utils/request';
import type { User } from '../types/api';

interface UserListResponse {
  items: User[];
  total: number;
}

/**
 * 获取用户列表
 */
export const getUserList = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  role?: string;
}) => {
  return request<UserListResponse>({
    url: '/users',
    method: 'get',
    params
  }).then(response => {
    return response.data;
  });
};

/**
 * 更新用户信息
 */
export const updateUser = (id: number, data: Partial<User>) => {
  return request<User>({
    url: `/users/${id}`,
    method: 'patch',
    data
  }).then(response => {
    return response.data;
  }).catch(error => {
    if (error.response && error.response.status === 404) {
      throw new Error(`用户ID ${id} 不存在`);
    }
    throw error;
  });
};

/**
 * 删除用户
 */
export const deleteUser = (id: number) => {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  }).then(response => {
    return response.data;
  }).catch(error => {
    if (error.response && error.response.status === 404) {
      throw new Error(`用户ID ${id} 不存在`);
    }
    throw error;
  });
};

/**
 * 更新用户密码
 */
export const updatePassword = (id: number, data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return request({
    url: `/users/${id}/password`,
    method: 'patch',
    data
  }).then(response => {
    return response.data;
  });
};

/**
 * 更新用户角色
 */
export const updateUserRole = (id: number, role: 'admin' | 'employee') => {
  return request<User>({
    url: `/users/${id}/role`,
    method: 'patch',
    data: { role }
  }).then(response => {
    return response.data;
  });
}; 