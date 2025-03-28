import { PrerequisiteService } from './prerequisite.service';
import { CreatePrerequisiteDto } from './dto/create-prerequisite.dto';
import { Prerequisite } from '../../database/entities/prerequisite.entity';
export declare class PrerequisiteController {
    private readonly prerequisiteService;
    constructor(prerequisiteService: PrerequisiteService);
    create(createPrerequisiteDto: CreatePrerequisiteDto): Promise<Prerequisite>;
    findAll(projectId: string): Promise<Prerequisite[]>;
    findOne(id: string): Promise<Prerequisite>;
    update(id: string, updateData: Partial<Prerequisite>): Promise<Prerequisite>;
    remove(id: string): Promise<void>;
}
