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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const node_entity_1 = require("./node.entity");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["NOT_STARTED"] = "not_started";
    ProjectStatus["IN_PROGRESS"] = "in_progress";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["DELAYED"] = "delayed";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Project.prototype, "deliverables", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'days_to_complete' }),
    __metadata("design:type", Number)
], Project.prototype, "daysToComplete", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_end_date' }),
    __metadata("design:type", Date)
], Project.prototype, "expectedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.NOT_STARTED
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Project.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Project.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.projects),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => node_entity_1.Node, node => node.project),
    __metadata("design:type", Array)
], Project.prototype, "nodes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map