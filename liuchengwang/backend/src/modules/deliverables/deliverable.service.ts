import { Injectable, Logger } from '@nestjs/common';
import { DeliverableRepository } from './deliverable.repository';
import { Deliverable } from './deliverable.entity';

@Injectable()
export class DeliverableService {
  private readonly logger = new Logger(DeliverableService.name);

  constructor(private readonly deliverableRepository: DeliverableRepository) {}

  async findAll(projectId: string, nodeId: number): Promise<Deliverable[]> {
    this.logger.log(`查询节点交付内容列表, 项目ID: ${projectId}, 节点ID: ${nodeId}`);
    
    try {
      const deliverables = await this.deliverableRepository.find({
        where: { nodeId },
        order: { id: 'ASC' }
      });
      
      // 添加调试日志
      this.logger.debug(`找到 ${deliverables.length} 个交付内容`);
      this.logger.debug(`交付内容列表: ${JSON.stringify(deliverables)}`);
      
      return deliverables;
    } catch (error) {
      this.logger.error(`查询节点交付内容列表失败: ${error.message}`, error.stack);
      throw error;
    }
  }
} 