import { Node } from '../../database/entities/node.entity';
export declare enum ProjectStatus {
    NOT_STARTED = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    DELAYED = 3
}
export declare class Project {
    id: string;
    name: string;
    password: string;
    deliverables: string;
    status: ProjectStatus;
    created_at: Date;
    updated_at: Date;
    nodes: Node[];
}
