import { Node } from './node.entity';
export declare enum IssueStatus {
    PENDING = "pending",
    RESOLVED = "resolved"
}
export declare class Issue {
    id: number;
    nodeId: number;
    node: Node;
    content: string;
    status: IssueStatus;
    startDate: Date;
    expectedEndDate: Date;
    durationDays: number;
    createdAt: Date;
    updatedAt: Date;
}
