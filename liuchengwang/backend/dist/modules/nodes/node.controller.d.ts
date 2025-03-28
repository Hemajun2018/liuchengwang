import { NodeService } from './node.service';
import { Node } from '../../database/entities/node.entity';
import { Issue } from '../../database/entities/issue.entity';
import { Material } from '../../database/entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class NodeController {
    private readonly nodeService;
    private readonly logger;
    constructor(nodeService: NodeService);
    create(projectId: string, createNodeDto: {
        name: string;
        description: string;
        descriptions?: string[];
        order: number;
        startTime?: Date;
        endTime?: Date;
        daysNeeded?: number;
        isPrerequisite?: boolean;
        isResult?: boolean;
        expectedEndDate?: Date;
    }): Promise<Node>;
    findAll(projectId: string): Promise<Node[]>;
    findOne(projectId: string, id: string): Promise<Node>;
    update(projectId: string, id: string, updateNodeDto: Partial<Node>): Promise<Node>;
    remove(projectId: string, id: string): Promise<void>;
    updateOrder(projectId: string, data: {
        nodeIds: number[];
    }): Promise<void>;
    createIssue(projectId: string, nodeId: string, createIssueDto: {
        content: string;
        status: string;
        start_date?: string | null;
        expected_end_date?: string | null;
        duration_days?: number | null;
    }): Promise<Issue>;
    getIssues(projectId: string, nodeId: string): Promise<Issue[]>;
    updateIssue(projectId: string, nodeId: string, issueId: string, updateIssueDto: {
        content?: string;
        status?: string;
        start_date?: string | null;
        expected_end_date?: string | null;
        duration_days?: number | null;
    }): Promise<Issue>;
    deleteIssue(projectId: string, nodeId: string, issueId: string): Promise<void>;
    createMaterial(projectId: string, nodeId: string, createMaterialDto: CreateMaterialDto): Promise<Material>;
    getMaterials(projectId: string, nodeId: string): Promise<Material[]>;
    getMaterial(projectId: string, nodeId: string, materialId: string): Promise<Material>;
    updateMaterial(projectId: string, nodeId: string, materialId: string, updateMaterialDto: UpdateMaterialDto): Promise<Material>;
    deleteMaterial(projectId: string, nodeId: string, materialId: string): Promise<void>;
}
