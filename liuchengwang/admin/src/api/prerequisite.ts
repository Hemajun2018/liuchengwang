import request from '../utils/request';

// 前置条件类型定义（后端数据结构）
export interface Prerequisite {
  id: number;
  project_id: string;
  content: string;
  start_date: string | null;
  expected_end_date: string | null;
  duration_days: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// 前置条件UI类型定义（前端数据结构）
export interface PrerequisiteUI {
  id: number;
  project_id: string;
  content: string;
  startDate: string | null;
  endDate: string | null;
  durationDays: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// 将后端数据转换为前端数据
export function toPrerequisiteUI(prerequisite: Prerequisite): PrerequisiteUI {
  return {
    id: prerequisite.id,
    project_id: prerequisite.project_id,
    content: prerequisite.content,
    startDate: prerequisite.start_date,
    endDate: prerequisite.expected_end_date,
    durationDays: prerequisite.duration_days,
    status: prerequisite.status,
    created_at: prerequisite.created_at,
    updated_at: prerequisite.updated_at
  };
}

// 将前端数据转换为后端数据
export function toPrerequisiteDTO(prerequisiteUI: Partial<PrerequisiteUI>): Partial<Prerequisite> {
  const result: Partial<Prerequisite> = {};
  
  if (prerequisiteUI.id !== undefined) result.id = prerequisiteUI.id;
  if (prerequisiteUI.project_id !== undefined) result.project_id = prerequisiteUI.project_id;
  if (prerequisiteUI.content !== undefined) result.content = prerequisiteUI.content;
  if (prerequisiteUI.startDate !== undefined) result.start_date = prerequisiteUI.startDate;
  if (prerequisiteUI.endDate !== undefined) result.expected_end_date = prerequisiteUI.endDate;
  if (prerequisiteUI.durationDays !== undefined) result.duration_days = prerequisiteUI.durationDays;
  if (prerequisiteUI.status !== undefined) result.status = prerequisiteUI.status;
  
  return result;
}

/**
 * 获取项目的前置条件列表
 */
export const getPrerequisites = (projectId: string): Promise<PrerequisiteUI[]> => {
  return request({
    url: `/prerequisites/project/${projectId}`,
    method: 'get'
  }).then(response => response.data.map(toPrerequisiteUI));
};

/**
 * 创建前置条件
 */
export const createPrerequisite = (data: {
  project_id: string;
  content: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}): Promise<PrerequisiteUI> => {
  // 转换为后端格式
  const dto = {
    project_id: data.project_id,
    content: data.content,
    start_date: data.startDate,
    expected_end_date: data.endDate,
    status: data.status || 'pending' // 默认设置为'pending'
  };
  
  return request({
    url: '/prerequisites',
    method: 'post',
    data: dto
  }).then(response => toPrerequisiteUI(response.data));
};

/**
 * 更新前置条件
 */
export const updatePrerequisite = (id: number, data: Partial<PrerequisiteUI>): Promise<PrerequisiteUI> => {
  // 转换为后端格式
  const dto = toPrerequisiteDTO(data);
  
  return request({
    url: `/prerequisites/${id}`,
    method: 'patch',
    data: dto
  }).then(response => toPrerequisiteUI(response.data));
};

/**
 * 删除前置条件
 */
export const deletePrerequisite = (id: number): Promise<void> => {
  return request({
    url: `/prerequisites/${id}`,
    method: 'delete'
  }).then(response => response.data);
}; 