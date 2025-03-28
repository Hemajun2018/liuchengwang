import request from '../utils/request';
import type { LoginParams, RegisterParams, User, LoginResponse } from '../types/api';

/**
 * 用户登录
 * @param data 登录参数
 */
export const login = (data: LoginParams): Promise<LoginResponse> => {
  return request({
    url: '/users/login',
    method: 'post',
    data
  }).then(response => {
    // 确保返回完整的响应数据
    return response.data;
  });
};

/**
 * 用户注册
 * @param data 注册参数
 */
export const register = (data: RegisterParams): Promise<User> => {
  return request({
    url: '/users/register',
    method: 'post',
    data
  }).then(response => {
    return response.data;
  });
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = (): Promise<User> => {
  return request({
    url: '/users/profile',
    method: 'get'
  }).then(response => {
    return response.data;
  });
};

/**
 * 根据ID获取用户信息
 * @param id 用户ID
 */
export const getUserById = (id: number): Promise<User> => {
  return request({
    url: `/users/${id}`,
    method: 'get'
  }).then(response => {
    return response.data;
  });
}; 