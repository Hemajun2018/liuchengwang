import { Node } from './node.entity';
export declare enum DeliverableStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DELAYED = "delayed"
}
export declare class Deliverable {
    id: number;
    node_id: number;
    description: string;
    start_date: Date;
    expected_end_date: Date;
    duration_days: number;
    status: DeliverableStatus;
    created_at: Date;
    updated_at: Date;
    node: Node;
}
