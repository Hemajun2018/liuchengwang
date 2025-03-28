import { Node } from './node.entity';
export declare enum IssueStatus {
    PENDING = "pending",
    RESOLVED = "resolved"
}
export declare enum IssuePriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Issue {
    id: number;
    content: string;
    status: string;
    start_date: Date | null;
    expected_end_date: Date | null;
    duration_days: number | null;
    node: Node;
    created_at: Date;
    updated_at: Date;
}
