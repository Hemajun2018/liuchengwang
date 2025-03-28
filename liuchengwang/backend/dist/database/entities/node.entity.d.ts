import { Project } from './project.entity';
import { Issue } from './issue.entity';
import { Material } from './material.entity';
import { Deliverable } from './deliverable.entity';
export declare enum NodeStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    BLOCKED = "blocked"
}
export declare class Node {
    id: number;
    projectId: string;
    name: string;
    order: number;
    isPrerequisite: boolean;
    isResult: boolean;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    issues: Issue[];
    materials: Material[];
    deliverables: Deliverable[];
}
