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
exports.Deliverable = exports.DeliverableStatus = void 0;
const typeorm_1 = require("typeorm");
const node_entity_1 = require("./node.entity");
var DeliverableStatus;
(function (DeliverableStatus) {
    DeliverableStatus["NOT_STARTED"] = "not_started";
    DeliverableStatus["IN_PROGRESS"] = "in_progress";
    DeliverableStatus["COMPLETED"] = "completed";
    DeliverableStatus["DELAYED"] = "delayed";
})(DeliverableStatus || (exports.DeliverableStatus = DeliverableStatus = {}));
let Deliverable = class Deliverable {
};
exports.Deliverable = Deliverable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Deliverable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Deliverable.prototype, "node_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Deliverable.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Deliverable.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Deliverable.prototype, "expected_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deliverable.prototype, "duration_days", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DeliverableStatus,
        default: DeliverableStatus.NOT_STARTED
    }),
    __metadata("design:type", String)
], Deliverable.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Deliverable.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Deliverable.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => node_entity_1.Node, node => node.deliverables, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'node_id' }),
    __metadata("design:type", node_entity_1.Node)
], Deliverable.prototype, "node", void 0);
exports.Deliverable = Deliverable = __decorate([
    (0, typeorm_1.Entity)('deliverables')
], Deliverable);
//# sourceMappingURL=deliverable.entity.js.map