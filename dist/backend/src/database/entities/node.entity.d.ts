import { Project } from './project.entity';
import { Issue } from './issue.entity';
import { Material } from './material.entity';
export declare enum NodeStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DELAYED = "delayed"
}
export declare class Node {
    id: number;
    projectId: number;
    project: Project;
    name: string;
    order: number;
    status: NodeStatus;
    expectedEndDate: Date;
    actualEndDate: Date;
    isPrerequisite: boolean;
    isResult: boolean;
    issues: Issue[];
    materials: Material[];
    createdAt: Date;
    updatedAt: Date;
}
