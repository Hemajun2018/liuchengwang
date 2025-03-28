import request from '../utils/request';

export enum DeliverableStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed'
}

export interface Deliverable {
  id: number;
  node_id: number;
  description: string;
  start_date: string | null;
  expected_end_date: string | null;
  duration_days: number | null;
  status: DeliverableStatus;
  created_at: string;
  updated_at: string;
}

// 前端使用的交付内容接口（驼峰命名）
export interface DeliverableUI {
  id?: number;
  nodeId: number;
  description: string;
  startDate: string | null;
  endDate: string | null;
  durationDays: number;
  status: DeliverableStatus;
  createdAt?: string;
  updatedAt?: string;
}

// 后端到前端的转换函数
export function toDeliverableUI(deliverable: Deliverable): DeliverableUI {
  return {
    id: deliverable.id,
    nodeId: deliverable.node_id,
    description: deliverable.description,
    startDate: deliverable.start_date,
    endDate: deliverable.expected_end_date,
    durationDays: deliverable.duration_days || 0,
    status: deliverable.status,
    createdAt: deliverable.created_at,
    updatedAt: deliverable.updated_at
  };
}

// 前端到后端的转换函数
export function toDeliverableDTO(deliverable: DeliverableUI): Partial<Deliverable> {
  return {
    description: deliverable.description,
    start_date: deliverable.startDate,
    expected_end_date: deliverable.endDate,
    duration_days: deliverable.durationDays,
    status: deliverable.status
  };
}

/**
 * 获取节点的交付内容列表
 */
export const getDeliverables = async (projectId: string, nodeId: number): Promise<Deliverable[]> => {
  console.log(`获取节点交付内容, 项目ID: ${projectId}, 节点ID: ${nodeId}`);
  try {
    const response = await request({
      url: `/projects/${projectId}/nodes/${nodeId}/deliverables`,
      method: 'get'
    });
    
    // 添加调试日志
    console.log(`API响应状态: ${response.status}`);
    console.log(`获取到 ${response.data.length} 个交付内容:`, response.data);
    
    return response.data;
  } catch (error) {
    console.error('获取节点交付内容失败:', error);
    throw error;
  }
};

/**
 * 创建交付内容
 */
export const createDeliverable = (
  projectId: string,
  nodeId: number,
  data: DeliverableUI
): Promise<DeliverableUI> => {
  return request({
    url: `/projects/${projectId}/nodes/${nodeId}/deliverables`,
    method: 'post',
    data: toDeliverableDTO(data)
  }).then(response => toDeliverableUI(response.data));
};

/**
 * 更新交付内容
 */
export const updateDeliverable = (
  projectId: string,
  nodeId: number,
  deliverableId: number,
  data: Partial<DeliverableUI>
): Promise<DeliverableUI> => {
  const dto: any = {};
  if (data.description !== undefined) dto.description = data.description;
  if (data.startDate !== undefined) dto.start_date = data.startDate;
  if (data.endDate !== undefined) dto.expected_end_date = data.endDate;
  if (data.durationDays !== undefined) dto.duration_days = data.durationDays;
  if (data.status !== undefined) dto.status = data.status;

  return request({
    url: `/projects/${projectId}/nodes/${nodeId}/deliverables/${deliverableId}`,
    method: 'patch',
    data: dto
  }).then(response => toDeliverableUI(response.data));
};

/**
 * 删除交付内容
 */
export const deleteDeliverable = (
  projectId: string,
  nodeId: number,
  deliverableId: number
): Promise<void> => {
  return request({
    url: `/projects/${projectId}/nodes/${nodeId}/deliverables/${deliverableId}`,
    method: 'delete'
  }).then(response => response.data);
}; 