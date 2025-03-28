"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrerequisiteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prerequisite_controller_1 = require("./prerequisite.controller");
const prerequisite_service_1 = require("./prerequisite.service");
const prerequisite_entity_1 = require("../../database/entities/prerequisite.entity");
let PrerequisiteModule = class PrerequisiteModule {
};
exports.PrerequisiteModule = PrerequisiteModule;
exports.PrerequisiteModule = PrerequisiteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prerequisite_entity_1.Prerequisite])],
        controllers: [prerequisite_controller_1.PrerequisiteController],
        providers: [prerequisite_service_1.PrerequisiteService],
        exports: [prerequisite_service_1.PrerequisiteService]
    })
], PrerequisiteModule);
//# sourceMappingURL=prerequisite.module.js.map