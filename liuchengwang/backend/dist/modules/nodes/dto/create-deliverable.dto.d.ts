import { DeliverableStatus } from '../../../database/entities/deliverable.entity';
export declare class CreateDeliverableDto {
    description: string;
    start_date?: string;
    expected_end_date?: string;
    duration_days?: number;
    status?: DeliverableStatus;
}
