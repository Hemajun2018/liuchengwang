import { Node } from './node.entity';
export declare enum MaterialType {
    DOCUMENT = "document",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    OTHER = "other"
}
export declare enum MaterialStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DELAYED = "delayed"
}
export declare class Material {
    id: number;
    nodeId: number;
    name: string;
    description: string;
    url: string;
    type: MaterialType;
    fileSize: string;
    start_date: Date | null;
    expected_end_date: Date | null;
    duration_days: number | null;
    status: MaterialStatus;
    createdAt: Date;
    updatedAt: Date;
    node: Node;
}
