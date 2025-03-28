import { Repository } from 'typeorm';
import { Deliverable } from '../../database/entities/deliverable.entity';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { UpdateDeliverableDto } from './dto/update-deliverable.dto';
export declare class DeliverableService {
    private deliverableRepository;
    constructor(deliverableRepository: Repository<Deliverable>);
    create(nodeId: number, createDeliverableDto: CreateDeliverableDto): Promise<Deliverable>;
    findAll(nodeId: number): Promise<Deliverable[]>;
    findOne(id: number): Promise<Deliverable>;
    update(id: number, updateDeliverableDto: UpdateDeliverableDto): Promise<Deliverable>;
    remove(id: number): Promise<void>;
}
