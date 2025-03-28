import { Repository } from 'typeorm';
import { Prerequisite } from '../../database/entities/prerequisite.entity';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
export declare class PrerequisiteService {
    private prerequisiteRepository;
    constructor(prerequisiteRepository: Repository<Prerequisite>);
    create(createPrerequisiteDto: CreatePrerequisiteDto): Promise<Prerequisite>;
    findAll(projectId: string): Promise<Prerequisite[]>;
    findOne(id: number): Promise<Prerequisite>;
    update(id: number, updateData: Partial<Prerequisite>): Promise<Prerequisite>;
    remove(id: number): Promise<void>;
}
