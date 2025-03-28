"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NodeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeController = void 0;
const common_1 = require("@nestjs/common");
const node_service_1 = require("./node.service");
const create_material_dto_1 = require("./dto/create-material.dto");
const update_material_dto_1 = require("./dto/update-material.dto");
let NodeController = NodeController_1 = class NodeController {
    constructor(nodeService) {
        this.nodeService = nodeService;
        this.logger = new common_1.Logger(NodeController_1.name);
    }
    async create(projectId, createNodeDto) {
        this.logger.log('=== 开始创建节点 ===');
        this.logger.log(`项目ID: ${projectId}`);
        this.logger.log(`请求参数: ${JSON.stringify(createNodeDto, null, 2)}`);
        try {
            const node = await this.nodeService.create(projectId, createNodeDto);
            this.logger.log(`节点创建成功: ${JSON.stringify(node, null, 2)}`);
            this.logger.log('=== 节点创建完成 ===\n');
            return node;
        }
        catch (error) {
            this.logger.error(`节点创建失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点创建异常 ===\n');
            throw error;
        }
    }
    async findAll(projectId) {
        this.logger.log('=== 开始获取节点列表 ===');
        this.logger.log(`项目ID: ${projectId}`);
        try {
            const nodes = await this.nodeService.findAll(projectId);
            this.logger.log(`获取到 ${nodes.length} 个节点`);
            this.logger.log(`节点列表: ${JSON.stringify(nodes, null, 2)}`);
            this.logger.log('=== 节点列表获取完成 ===\n');
            return nodes;
        }
        catch (error) {
            this.logger.error(`获取节点列表失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点列表获取异常 ===\n');
            throw error;
        }
    }
    async findOne(projectId, id) {
        this.logger.log('=== 开始获取单个节点 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${id}`);
        try {
            const node = await this.nodeService.findOne(projectId, +id);
            this.logger.log(`获取到节点: ${JSON.stringify(node, null, 2)}`);
            this.logger.log('=== 节点获取完成 ===\n');
            return node;
        }
        catch (error) {
            this.logger.error(`获取节点失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点获取异常 ===\n');
            throw error;
        }
    }
    async update(projectId, id, updateNodeDto) {
        this.logger.log('=== 开始更新节点 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${id}`);
        this.logger.log(`更新数据: ${JSON.stringify(updateNodeDto, null, 2)}`);
        try {
            const node = await this.nodeService.update(projectId, +id, updateNodeDto);
            this.logger.log(`节点更新成功: ${JSON.stringify(node, null, 2)}`);
            this.logger.log('=== 节点更新完成 ===\n');
            return node;
        }
        catch (error) {
            this.logger.error(`更新节点失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点更新异常 ===\n');
            throw error;
        }
    }
    async remove(projectId, id) {
        this.logger.log('=== 开始删除节点 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${id}`);
        try {
            await this.nodeService.remove(projectId, +id);
            this.logger.log('节点删除成功');
            this.logger.log('=== 节点删除完成 ===\n');
        }
        catch (error) {
            this.logger.error(`删除节点失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点删除异常 ===\n');
            throw error;
        }
    }
    async updateOrder(projectId, data) {
        this.logger.log('=== 开始更新节点顺序 ===');
        this.logger.log(`项目ID: ${projectId}`);
        this.logger.log(`节点顺序: ${JSON.stringify(data.nodeIds)}`);
        try {
            await this.nodeService.updateOrder(projectId, data.nodeIds);
            this.logger.log('节点顺序更新成功');
            this.logger.log('=== 节点顺序更新完成 ===\n');
        }
        catch (error) {
            this.logger.error(`更新节点顺序失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 节点顺序更新异常 ===\n');
            throw error;
        }
    }
    async createIssue(projectId, nodeId, createIssueDto) {
        this.logger.log('=== 开始创建问题 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}`);
        this.logger.log(`请求参数: ${JSON.stringify(createIssueDto, null, 2)}`);
        try {
            if (!createIssueDto.content) {
                throw new Error('问题描述不能为空');
            }
            const issue = await this.nodeService.createIssue(projectId, +nodeId, createIssueDto);
            this.logger.log(`问题创建成功: ${JSON.stringify(issue, null, 2)}`);
            return issue;
        }
        catch (error) {
            this.logger.error(`问题创建失败: ${error.message}`);
            throw error;
        }
    }
    async getIssues(projectId, nodeId) {
        this.logger.log('=== 开始获取问题列表 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}`);
        try {
            const issues = await this.nodeService.getIssues(projectId, +nodeId);
            this.logger.log(`获取到 ${issues.length} 个问题`);
            this.logger.log(`问题列表: ${JSON.stringify(issues, null, 2)}`);
            this.logger.log('=== 问题列表获取完成 ===\n');
            return issues;
        }
        catch (error) {
            this.logger.error(`获取问题列表失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 问题列表获取异常 ===\n');
            throw error;
        }
    }
    async updateIssue(projectId, nodeId, issueId, updateIssueDto) {
        this.logger.log('=== 开始更新问题 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}, 问题ID: ${issueId}`);
        this.logger.log(`更新数据: ${JSON.stringify(updateIssueDto, null, 2)}`);
        try {
            const issue = await this.nodeService.updateIssue(projectId, +nodeId, +issueId, updateIssueDto);
            this.logger.log(`问题更新成功: ${JSON.stringify(issue, null, 2)}`);
            return issue;
        }
        catch (error) {
            this.logger.error(`更新问题失败: ${error.message}`);
            throw error;
        }
    }
    async deleteIssue(projectId, nodeId, issueId) {
        this.logger.log('=== 开始删除问题 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}, 问题ID: ${issueId}`);
        try {
            await this.nodeService.deleteIssue(projectId, +nodeId, +issueId);
            this.logger.log('问题删除成功');
            this.logger.log('=== 问题删除完成 ===\n');
        }
        catch (error) {
            this.logger.error(`删除问题失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 问题删除异常 ===\n');
            throw error;
        }
    }
    async createMaterial(projectId, nodeId, createMaterialDto) {
        this.logger.log('=== 开始创建材料 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}`);
        this.logger.log(`请求参数: ${JSON.stringify(createMaterialDto, null, 2)}`);
        try {
            if (!createMaterialDto.name) {
                throw new Error('材料名称不能为空');
            }
            if (!createMaterialDto.description) {
                throw new Error('材料描述不能为空');
            }
            const material = await this.nodeService.createMaterial(projectId, +nodeId, createMaterialDto);
            this.logger.log(`材料创建成功: ${JSON.stringify(material, null, 2)}`);
            this.logger.log('=== 材料创建完成 ===\n');
            return material;
        }
        catch (error) {
            this.logger.error(`材料创建失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 材料创建异常 ===\n');
            throw error;
        }
    }
    async getMaterials(projectId, nodeId) {
        this.logger.log('=== 开始获取材料列表 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}`);
        try {
            const materials = await this.nodeService.getMaterials(projectId, +nodeId);
            this.logger.log(`获取到 ${materials.length} 个材料`);
            this.logger.log(`材料列表: ${JSON.stringify(materials, null, 2)}`);
            this.logger.log('=== 材料列表获取完成 ===\n');
            return materials;
        }
        catch (error) {
            this.logger.error(`获取材料列表失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 材料列表获取异常 ===\n');
            throw error;
        }
    }
    async getMaterial(projectId, nodeId, materialId) {
        this.logger.log('=== 开始获取单个材料 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}, 材料ID: ${materialId}`);
        try {
            const material = await this.nodeService.getMaterial(projectId, +nodeId, +materialId);
            if (!material) {
                throw new Error('材料不存在');
            }
            this.logger.log(`获取到材料: ${JSON.stringify(material, null, 2)}`);
            this.logger.log('=== 材料获取完成 ===\n');
            return material;
        }
        catch (error) {
            this.logger.error(`获取材料失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 材料获取异常 ===\n');
            throw error;
        }
    }
    async updateMaterial(projectId, nodeId, materialId, updateMaterialDto) {
        this.logger.log('=== 开始更新材料 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}, 材料ID: ${materialId}`);
        this.logger.log(`更新数据: ${JSON.stringify(updateMaterialDto, null, 2)}`);
        try {
            const material = await this.nodeService.updateMaterial(projectId, +nodeId, +materialId, updateMaterialDto);
            this.logger.log(`材料更新成功: ${JSON.stringify(material, null, 2)}`);
            this.logger.log('=== 材料更新完成 ===\n');
            return material;
        }
        catch (error) {
            this.logger.error(`更新材料失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 材料更新异常 ===\n');
            throw error;
        }
    }
    async deleteMaterial(projectId, nodeId, materialId) {
        this.logger.log('=== 开始删除材料 ===');
        this.logger.log(`项目ID: ${projectId}, 节点ID: ${nodeId}, 材料ID: ${materialId}`);
        try {
            await this.nodeService.deleteMaterial(projectId, +nodeId, +materialId);
            this.logger.log('材料删除成功');
            this.logger.log('=== 材料删除完成 ===\n');
        }
        catch (error) {
            this.logger.error(`删除材料失败: ${error.message}`);
            this.logger.error(`错误堆栈: ${error.stack}`);
            this.logger.error('=== 材料删除异常 ===\n');
            throw error;
        }
    }
};
exports.NodeController = NodeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Post)(':nodeId/issues'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "createIssue", null);
__decorate([
    (0, common_1.Get)(':nodeId/issues'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "getIssues", null);
__decorate([
    (0, common_1.Patch)(':nodeId/issues/:issueId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Param)('issueId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "updateIssue", null);
__decorate([
    (0, common_1.Delete)(':nodeId/issues/:issueId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Param)('issueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "deleteIssue", null);
__decorate([
    (0, common_1.Post)(':nodeId/materials'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_material_dto_1.CreateMaterialDto]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "createMaterial", null);
__decorate([
    (0, common_1.Get)(':nodeId/materials'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "getMaterials", null);
__decorate([
    (0, common_1.Get)(':nodeId/materials/:materialId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Param)('materialId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "getMaterial", null);
__decorate([
    (0, common_1.Patch)(':nodeId/materials/:materialId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Param)('materialId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, update_material_dto_1.UpdateMaterialDto]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "updateMaterial", null);
__decorate([
    (0, common_1.Delete)(':nodeId/materials/:materialId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Param)('materialId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "deleteMaterial", null);
exports.NodeController = NodeController = NodeController_1 = __decorate([
    (0, common_1.Controller)('projects/:projectId/nodes'),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], NodeController);
//# sourceMappingURL=node.controller.js.map