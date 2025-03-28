import { DeliverableService } from './deliverable.service';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { UpdateDeliverableDto } from './dto/update-deliverable.dto';
export declare class DeliverableController {
    private readonly deliverableService;
    constructor(deliverableService: DeliverableService);
    create(nodeId: string, createDeliverableDto: CreateDeliverableDto): Promise<import("../../database/entities/deliverable.entity").Deliverable>;
    findAll(nodeId: string): Promise<import("../../database/entities/deliverable.entity").Deliverable[]>;
    findOne(id: string): Promise<import("../../database/entities/deliverable.entity").Deliverable>;
    update(id: string, updateDeliverableDto: UpdateDeliverableDto): Promise<import("../../database/entities/deliverable.entity").Deliverable>;
    remove(id: string): Promise<void>;
}
