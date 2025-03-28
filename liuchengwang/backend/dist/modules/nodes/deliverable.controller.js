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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverableController = void 0;
const common_1 = require("@nestjs/common");
const deliverable_service_1 = require("./deliverable.service");
const create_deliverable_dto_1 = require("./dto/create-deliverable.dto");
const update_deliverable_dto_1 = require("./dto/update-deliverable.dto");
let DeliverableController = class DeliverableController {
    constructor(deliverableService) {
        this.deliverableService = deliverableService;
    }
    create(nodeId, createDeliverableDto) {
        console.log('收到创建交付内容请求:', createDeliverableDto);
        return this.deliverableService.create(+nodeId, createDeliverableDto);
    }
    findAll(nodeId) {
        console.log('收到获取节点交付内容列表请求, 节点ID:', nodeId);
        return this.deliverableService.findAll(+nodeId);
    }
    findOne(id) {
        console.log('收到获取单个交付内容请求, ID:', id);
        return this.deliverableService.findOne(+id);
    }
    update(id, updateDeliverableDto) {
        console.log('收到更新交付内容请求, ID:', id);
        console.log('更新数据:', updateDeliverableDto);
        return this.deliverableService.update(+id, updateDeliverableDto);
    }
    remove(id) {
        console.log('收到删除交付内容请求, ID:', id);
        return this.deliverableService.remove(+id);
    }
};
exports.DeliverableController = DeliverableController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('nodeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_deliverable_dto_1.CreateDeliverableDto]),
    __metadata("design:returntype", void 0)
], DeliverableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('nodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliverableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliverableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deliverable_dto_1.UpdateDeliverableDto]),
    __metadata("design:returntype", void 0)
], DeliverableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliverableController.prototype, "remove", null);
exports.DeliverableController = DeliverableController = __decorate([
    (0, common_1.Controller)('projects/:projectId/nodes/:nodeId/deliverables'),
    __metadata("design:paramtypes", [deliverable_service_1.DeliverableService])
], DeliverableController);
//# sourceMappingURL=deliverable.controller.js.map