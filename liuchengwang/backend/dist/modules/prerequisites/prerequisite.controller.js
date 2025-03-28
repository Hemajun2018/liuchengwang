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
exports.PrerequisiteController = void 0;
const common_1 = require("@nestjs/common");
const prerequisite_service_1 = require("./prerequisite.service");
const create_prerequisite_dto_1 = require("./dto/create-prerequisite.dto");
let PrerequisiteController = class PrerequisiteController {
    constructor(prerequisiteService) {
        this.prerequisiteService = prerequisiteService;
    }
    create(createPrerequisiteDto) {
        console.log('收到创建前置条件请求:', createPrerequisiteDto);
        return this.prerequisiteService.create(createPrerequisiteDto);
    }
    findAll(projectId) {
        console.log('收到获取项目前置条件列表请求, 项目ID:', projectId);
        return this.prerequisiteService.findAll(projectId);
    }
    findOne(id) {
        console.log('收到获取单个前置条件请求, ID:', id);
        return this.prerequisiteService.findOne(+id);
    }
    update(id, updateData) {
        console.log('收到更新前置条件请求, ID:', id);
        console.log('更新数据:', updateData);
        return this.prerequisiteService.update(+id, updateData);
    }
    remove(id) {
        console.log('收到删除前置条件请求, ID:', id);
        return this.prerequisiteService.remove(+id);
    }
};
exports.PrerequisiteController = PrerequisiteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prerequisite_dto_1.CreatePrerequisiteDto]),
    __metadata("design:returntype", void 0)
], PrerequisiteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrerequisiteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrerequisiteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PrerequisiteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrerequisiteController.prototype, "remove", null);
exports.PrerequisiteController = PrerequisiteController = __decorate([
    (0, common_1.Controller)('prerequisites'),
    __metadata("design:paramtypes", [prerequisite_service_1.PrerequisiteService])
], PrerequisiteController);
//# sourceMappingURL=prerequisite.controller.js.map