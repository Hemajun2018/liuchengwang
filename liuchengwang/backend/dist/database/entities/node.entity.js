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
exports.Node = exports.NodeStatus = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const issue_entity_1 = require("./issue.entity");
const material_entity_1 = require("./material.entity");
const deliverable_entity_1 = require("./deliverable.entity");
var NodeStatus;
(function (NodeStatus) {
    NodeStatus["NOT_STARTED"] = "not_started";
    NodeStatus["IN_PROGRESS"] = "in_progress";
    NodeStatus["COMPLETED"] = "completed";
    NodeStatus["BLOCKED"] = "blocked";
})(NodeStatus || (exports.NodeStatus = NodeStatus = {}));
let Node = class Node {
};
exports.Node = Node;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Node.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id' }),
    __metadata("design:type", String)
], Node.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Node.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Node.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_prerequisite', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Node.prototype, "isPrerequisite", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_result', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Node.prototype, "isResult", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Node.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Node.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.nodes),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", project_entity_1.Project)
], Node.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => issue_entity_1.Issue, issue => issue.node),
    __metadata("design:type", Array)
], Node.prototype, "issues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => material_entity_1.Material, material => material.node),
    __metadata("design:type", Array)
], Node.prototype, "materials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deliverable_entity_1.Deliverable, deliverable => deliverable.node),
    __metadata("design:type", Array)
], Node.prototype, "deliverables", void 0);
exports.Node = Node = __decorate([
    (0, typeorm_1.Entity)('nodes')
], Node);
//# sourceMappingURL=node.entity.js.map