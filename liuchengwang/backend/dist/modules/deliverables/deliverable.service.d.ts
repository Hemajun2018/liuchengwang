import { DeliverableRepository } from './deliverable.repository';
import { Deliverable } from './deliverable.entity';
export declare class DeliverableService {
    private readonly deliverableRepository;
    private readonly logger;
    constructor(deliverableRepository: DeliverableRepository);
    findAll(projectId: string, nodeId: number): Promise<Deliverable[]>;
}
