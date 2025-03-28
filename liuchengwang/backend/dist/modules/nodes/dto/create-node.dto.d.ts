import { NodeStatus } from '../../../database/entities/node.entity';
export declare class CreateNodeDto {
    name: string;
    description?: string;
    descriptions?: string[];
    order: number;
    status?: NodeStatus;
    startTime?: Date;
    endTime?: Date;
    expectedEndDate?: Date;
    isPrerequisite?: boolean;
    isResult?: boolean;
}
