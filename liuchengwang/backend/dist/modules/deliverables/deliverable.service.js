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
var DeliverableService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverableService = void 0;
const common_1 = require("@nestjs/common");
const deliverable_repository_1 = require("./deliverable.repository");
let DeliverableService = DeliverableService_1 = class DeliverableService {
    constructor(deliverableRepository) {
        this.deliverableRepository = deliverableRepository;
        this.logger = new common_1.Logger(DeliverableService_1.name);
    }
    async findAll(projectId, nodeId) {
        this.logger.log(`查询节点交付内容列表, 项目ID: ${projectId}, 节点ID: ${nodeId}`);
        try {
            const deliverables = await this.deliverableRepository.find({
                where: { nodeId },
                order: { id: 'ASC' }
            });
            this.logger.debug(`找到 ${deliverables.length} 个交付内容`);
            this.logger.debug(`交付内容列表: ${JSON.stringify(deliverables)}`);
            return deliverables;
        }
        catch (error) {
            this.logger.error(`查询节点交付内容列表失败: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.DeliverableService = DeliverableService;
exports.DeliverableService = DeliverableService = DeliverableService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof deliverable_repository_1.DeliverableRepository !== "undefined" && deliverable_repository_1.DeliverableRepository) === "function" ? _a : Object])
], DeliverableService);
//# sourceMappingURL=deliverable.service.js.map