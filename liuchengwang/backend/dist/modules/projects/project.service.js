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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../../database/entities/project.entity");
const bcrypt = require("bcrypt");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async create(createProjectDto) {
        console.log('创建项目请求数据:', createProjectDto);
        const existingProject = await this.projectRepository.findOne({
            where: { name: createProjectDto.name }
        });
        if (existingProject) {
            console.log('项目名称已存在:', existingProject);
            throw new common_1.ConflictException('项目名称已存在');
        }
        const project = this.projectRepository.create({
            name: createProjectDto.name,
            password: await bcrypt.hash(createProjectDto.password, 10),
            status: project_entity_1.ProjectStatus.NOT_STARTED,
            days_needed: 0
        });
        console.log('准备保存的项目数据:', project);
        try {
            const savedProject = await this.projectRepository.save(project);
            console.log('保存成功，返回数据:', savedProject);
            return savedProject;
        }
        catch (error) {
            console.error('保存项目时出错:', error);
            throw error;
        }
    }
    async findAll(params) {
        console.log('开始查询项目列表, 参数:', params);
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        if (params?.keyword) {
            queryBuilder.andWhere('project.name LIKE :keyword', { keyword: `%${params.keyword}%` });
        }
        if (params?.status) {
            queryBuilder.andWhere('project.status = :status', { status: params.status });
        }
        const page = params?.page || 1;
        const pageSize = params?.pageSize || 10;
        const skip = (page - 1) * pageSize;
        queryBuilder
            .select(['project.id', 'project.name', 'project.status'])
            .orderBy('project.created_at', 'DESC')
            .skip(skip)
            .take(pageSize);
        const [projects, total] = await queryBuilder.getManyAndCount();
        console.log('查询到的项目列表:', projects);
        console.log('项目总数:', total);
        return {
            items: projects,
            total
        };
    }
    async findOne(id) {
        console.log('查询单个项目，ID:', id);
        const project = await this.projectRepository.findOne({
            where: { id }
        });
        if (!project) {
            console.log('项目不存在');
            throw new common_1.NotFoundException('项目不存在');
        }
        console.log('查询到的项目:', project);
        return project;
    }
    async update(id, updateProjectDto) {
        console.log('开始更新项目, ID:', id);
        console.log('更新数据:', JSON.stringify(updateProjectDto, null, 2));
        const project = await this.findOne(id);
        console.log('找到现有项目:', JSON.stringify(project, null, 2));
        if (updateProjectDto.password) {
            updateProjectDto.password = await bcrypt.hash(updateProjectDto.password, 10);
        }
        if (updateProjectDto.start_time) {
            console.log('处理开始时间:', updateProjectDto.start_time);
            updateProjectDto.start_time = new Date(updateProjectDto.start_time);
        }
        if (updateProjectDto.end_time) {
            console.log('处理结束时间:', updateProjectDto.end_time);
            updateProjectDto.end_time = new Date(updateProjectDto.end_time);
        }
        Object.assign(project, updateProjectDto);
        console.log('合并后的数据:', JSON.stringify(project, null, 2));
        try {
            const updatedProject = await this.projectRepository.save(project);
            console.log('更新成功,返回数据:', JSON.stringify(updatedProject, null, 2));
            return updatedProject;
        }
        catch (error) {
            console.error('更新失败:', error);
            throw error;
        }
    }
    async remove(id) {
        console.log('删除项目，ID:', id);
        const project = await this.findOne(id);
        const result = await this.projectRepository.remove(project);
        console.log('删除成功，返回数据:', result);
        return result;
    }
    async verifyProject(name, password) {
        console.log('验证项目密码，项目名:', name);
        const project = await this.projectRepository.findOne({
            where: { name }
        });
        if (!project) {
            console.log('项目不存在');
            throw new common_1.NotFoundException('项目不存在');
        }
        const isPasswordValid = await bcrypt.compare(password, project.password);
        if (!isPasswordValid) {
            console.log('项目密码错误');
            throw new common_1.NotFoundException('项目密码错误');
        }
        console.log('验证成功，返回数据:', project);
        return project;
    }
    async updatePrerequisite(id, prerequisiteDto) {
        console.log('开始更新项目前置条件, ID:', id);
        console.log('前置条件数据:', JSON.stringify(prerequisiteDto, null, 2));
        const project = await this.findOne(id);
        let status = prerequisiteDto.status;
        if (status === null || status === undefined) {
            status = 0;
            console.log('状态值为null或undefined，已设置为默认值0');
        }
        project.deliverables = prerequisiteDto.deliverables;
        project.status = status;
        console.log('准备保存的项目数据:', JSON.stringify({
            deliverables: project.deliverables,
            status: project.status
        }, null, 2));
        try {
            const updatedProject = await this.projectRepository.save(project);
            console.log('前置条件更新成功,返回数据:', JSON.stringify(updatedProject, null, 2));
            return updatedProject;
        }
        catch (error) {
            console.error('更新前置条件失败:', error);
            throw error;
        }
    }
    async updateResult(id, resultDto) {
        console.log('开始更新项目成果, ID:', id);
        console.log('成果数据:', JSON.stringify(resultDto, null, 2));
        const project = await this.findOne(id);
        project.results = resultDto.results;
        console.log('准备保存的项目数据:', JSON.stringify({
            results: project.results
        }, null, 2));
        try {
            const updatedProject = await this.projectRepository.save(project);
            console.log('成果更新成功,返回数据:', JSON.stringify(updatedProject, null, 2));
            return updatedProject;
        }
        catch (error) {
            console.error('更新成果失败:', error);
            throw error;
        }
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map