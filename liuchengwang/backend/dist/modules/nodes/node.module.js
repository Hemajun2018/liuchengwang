"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_controller_1 = require("./node.controller");
const node_service_1 = require("./node.service");
const deliverable_controller_1 = require("./deliverable.controller");
const deliverable_service_1 = require("./deliverable.service");
const node_entity_1 = require("../../database/entities/node.entity");
const issue_entity_1 = require("../../database/entities/issue.entity");
const material_entity_1 = require("../../database/entities/material.entity");
const deliverable_entity_1 = require("../../database/entities/deliverable.entity");
let NodeModule = class NodeModule {
};
exports.NodeModule = NodeModule;
exports.NodeModule = NodeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([node_entity_1.Node, issue_entity_1.Issue, material_entity_1.Material, deliverable_entity_1.Deliverable])],
        controllers: [node_controller_1.NodeController, deliverable_controller_1.DeliverableController],
        providers: [node_service_1.NodeService, deliverable_service_1.DeliverableService],
        exports: [node_service_1.NodeService, deliverable_service_1.DeliverableService],
    })
], NodeModule);
//# sourceMappingURL=node.module.js.map