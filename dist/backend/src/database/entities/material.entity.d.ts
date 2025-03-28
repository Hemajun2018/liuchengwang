import { Node } from './node.entity';
export declare class Material {
    id: number;
    nodeId: number;
    node: Node;
    name: string;
    content: string;
    fileUrl: string;
    startDate: Date;
    expectedEndDate: Date;
    durationDays: number;
    createdAt: Date;
    updatedAt: Date;
}
