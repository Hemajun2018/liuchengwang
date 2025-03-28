import { MaterialType, MaterialStatus } from '../../../database/entities/material.entity';
export declare class CreateMaterialDto {
    name: string;
    description: string;
    url?: string;
    type?: MaterialType;
    fileSize?: string;
    start_date?: string;
    expected_end_date?: string;
    duration_days?: number;
    status?: MaterialStatus;
}
