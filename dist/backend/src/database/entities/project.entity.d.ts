import { User } from './user.entity';
import { Node } from './node.entity';
export declare enum ProjectStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DELAYED = "delayed"
}
export declare class Project {
    id: number;
    name: string;
    deliverables: string;
    startDate: Date;
    daysToComplete: number;
    expectedEndDate: Date;
    status: ProjectStatus;
    password: string;
    createdById: number;
    createdBy: User;
    nodes: Node[];
    createdAt: Date;
    updatedAt: Date;
}
