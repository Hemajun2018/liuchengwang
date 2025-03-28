import request from '../utils/request';
import { NodeStatus } from './node';

// 项目类型定义
export interface Project {
  id: string;
  name: string;
  password: string;
  deliverables: string | null;
  status: number;
  results?: Array<{
    id?: number;
    description: string;
  }>;
  created_at: Date;
  updated_at: Date;
}

interface ProjectListResponse {
  items: Project[];
  total: number;
}

export interface ProjectPrerequisite {
  deliverables: string | null;
  status: number;
}

export interface ProjectResult {
  results: Array<{
    id?: number;
    description: string;
  }>;
}

/**
 * 创建项目
 */
export const createProject = (data: {
  name: string;
  password: string;
}): Promise<Project> => {
  return request({
    url: '/projects',
    method: 'post',
    data
  }).then(response => response.data);
};

/**
 * 获取项目列表
 */
export const getProjectList = (params?: {
  page?: number;
  page_size?: number;
  keyword?: string;
  status?: NodeStatus;
}): Promise<ProjectListResponse> => {
  return request({
    url: '/projects',
    method: 'get',
    params
  }).then(response => response.data);
};

/**
 * 获取单个项目详情
 */
export const getProject = (id: string): Promise<Project> => {
  return request({
    url: `/projects/${id}`,
    method: 'get'
  }).then(response => response.data);
};

/**
 * 更新项目信息
 */
export const updateProject = (id: string, data: Partial<Project>): Promise<Project> => {
  return request({
    url: `/projects/${id}`,
    method: 'patch',
    data
  }).then(response => response.data);
};

/**
 * 删除项目
 */
export const deleteProject = (id: string): Promise<void> => {
  return request({
    url: `/projects/${id}`,
    method: 'delete'
  }).then(response => response.data);
};

/**
 * 验证项目密码
 */
export const verifyProject = (data: {
  name: string;
  password: string;
}): Promise<Project> => {
  return request({
    url: '/projects/verify',
    method: 'post',
    data
  }).then(response => response.data);
};

/**
 * 更新项目前置条件
 */
export const updateProjectPrerequisite = (id: string, data: ProjectPrerequisite): Promise<Project> => {
  console.log('发送更新前置条件请求:', {
    url: `/projects/${id}/prerequisite`,
    method: 'patch',
    data: JSON.stringify(data)
  });
  
  return request({
    url: `/projects/${id}/prerequisite`,
    method: 'patch',
    data
  }).then(response => response.data);
};

/**
 * 更新项目成果
 */
export const updateProjectResult = (id: string, data: ProjectResult): Promise<Project> => {
  return request({
    url: `/projects/${id}/result`,
    method: 'patch',
    data
  }).then(response => response.data);
}; 