import { Project } from './project.entity';
export declare class Prerequisite {
    id: number;
    project_id: string;
    content: string;
    start_date: Date;
    expected_end_date: Date;
    duration_days: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    project: Project;
}
