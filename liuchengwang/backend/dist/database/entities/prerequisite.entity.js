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
exports.Prerequisite = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
let Prerequisite = class Prerequisite {
};
exports.Prerequisite = Prerequisite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Prerequisite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prerequisite.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Prerequisite.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Prerequisite.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Prerequisite.prototype, "expected_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Prerequisite.prototype, "duration_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], Prerequisite.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Prerequisite.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Prerequisite.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", project_entity_1.Project)
], Prerequisite.prototype, "project", void 0);
exports.Prerequisite = Prerequisite = __decorate([
    (0, typeorm_1.Entity)('prerequisites')
], Prerequisite);
//# sourceMappingURL=prerequisite.entity.js.map