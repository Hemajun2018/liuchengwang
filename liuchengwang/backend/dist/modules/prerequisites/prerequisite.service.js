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
exports.PrerequisiteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prerequisite_entity_1 = require("../../database/entities/prerequisite.entity");
const date_fns_1 = require("date-fns");
let PrerequisiteService = class PrerequisiteService {
    constructor(prerequisiteRepository) {
        this.prerequisiteRepository = prerequisiteRepository;
    }
    async create(createPrerequisiteDto) {
        console.log('创建前置条件:', createPrerequisiteDto);
        const prerequisite = this.prerequisiteRepository.create(createPrerequisiteDto);
        if (createPrerequisiteDto.start_date && createPrerequisiteDto.expected_end_date) {
            const startDate = new Date(createPrerequisiteDto.start_date);
            const endDate = new Date(createPrerequisiteDto.expected_end_date);
            prerequisite.duration_days = (0, date_fns_1.differenceInDays)(endDate, startDate);
        }
        return this.prerequisiteRepository.save(prerequisite);
    }
    async findAll(projectId) {
        console.log('查询项目前置条件列表, 项目ID:', projectId);
        return this.prerequisiteRepository.find({
            where: { project_id: projectId },
            order: { created_at: 'ASC' }
        });
    }
    async findOne(id) {
        console.log('查询单个前置条件, ID:', id);
        const prerequisite = await this.prerequisiteRepository.findOne({
            where: { id }
        });
        if (!prerequisite) {
            throw new common_1.NotFoundException(`前置条件 #${id} 不存在`);
        }
        return prerequisite;
    }
    async update(id, updateData) {
        console.log('更新前置条件, ID:', id);
        console.log('更新数据:', updateData);
        const prerequisite = await this.findOne(id);
        Object.assign(prerequisite, updateData);
        if (prerequisite.start_date && prerequisite.expected_end_date) {
            prerequisite.duration_days = (0, date_fns_1.differenceInDays)(new Date(prerequisite.expected_end_date), new Date(prerequisite.start_date));
        }
        return this.prerequisiteRepository.save(prerequisite);
    }
    async remove(id) {
        console.log('删除前置条件, ID:', id);
        const prerequisite = await this.findOne(id);
        await this.prerequisiteRepository.remove(prerequisite);
    }
};
exports.PrerequisiteService = PrerequisiteService;
exports.PrerequisiteService = PrerequisiteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prerequisite_entity_1.Prerequisite)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrerequisiteService);
//# sourceMappingURL=prerequisite.service.js.map