import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../../database/entities/project.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: {
    name: string;
    password: string;
  }) {
    console.log('创建项目请求数据:', createProjectDto);

    // 检查项目名是否已存在
    const existingProject = await this.projectRepository.findOne({
      where: { name: createProjectDto.name }
    });

    if (existingProject) {
      console.log('项目名称已存在:', existingProject);
      throw new ConflictException('项目名称已存在');
    }

    // 创建新项目，只包含必要字段
    const project = this.projectRepository.create({
      name: createProjectDto.name,
      password: await bcrypt.hash(createProjectDto.password, 10),
      status: ProjectStatus.NOT_STARTED,
      days_needed: 0
    });

    console.log('准备保存的项目数据:', project);

    try {
      const savedProject = await this.projectRepository.save(project);
      console.log('保存成功，返回数据:', savedProject);
      return savedProject;
    } catch (error) {
      console.error('保存项目时出错:', error);
      throw error;
    }
  }

  async findAll(params?: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    status?: string;
  }) {
    console.log('开始查询项目列表, 参数:', params);
    
    const queryBuilder = this.projectRepository.createQueryBuilder('project');
    
    // 添加查询条件
    if (params?.keyword) {
      queryBuilder.andWhere('project.name LIKE :keyword', { keyword: `%${params.keyword}%` });
    }
    
    if (params?.status) {
      queryBuilder.andWhere('project.status = :status', { status: params.status });
    }
    
    // 计算分页
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    
    // 添加分页和排序
    queryBuilder
      .select(['project.id', 'project.name', 'project.status'])
      .orderBy('project.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    // 执行查询
    const [projects, total] = await queryBuilder.getManyAndCount();

    console.log('查询到的项目列表:', projects);
    console.log('项目总数:', total);
    
    return {
      items: projects,
      total
    };
  }

  async findOne(id: string) {
    console.log('查询单个项目，ID:', id);
    
    const project = await this.projectRepository.findOne({
      where: { id }
    });

    if (!project) {
      console.log('项目不存在');
      throw new NotFoundException('项目不存在');
    }

    console.log('查询到的项目:', project);
    return project;
  }

  async update(id: string, updateProjectDto: Partial<Project>) {
    console.log('开始更新项目, ID:', id);
    console.log('更新数据:', JSON.stringify(updateProjectDto, null, 2));
    
    // 查找项目
    const project = await this.findOne(id);
    console.log('找到现有项目:', JSON.stringify(project, null, 2));

    // 如果要更新密码，需要加密
    if (updateProjectDto.password) {
      updateProjectDto.password = await bcrypt.hash(updateProjectDto.password, 10);
    }

    // 处理日期字段
    if(updateProjectDto.start_time) {
      console.log('处理开始时间:', updateProjectDto.start_time);
      updateProjectDto.start_time = new Date(updateProjectDto.start_time);
    }
    if(updateProjectDto.end_time) {
      console.log('处理结束时间:', updateProjectDto.end_time);
      updateProjectDto.end_time = new Date(updateProjectDto.end_time);
    }

    // 合并更新
    Object.assign(project, updateProjectDto);
    console.log('合并后的数据:', JSON.stringify(project, null, 2));

    try {
      const updatedProject = await this.projectRepository.save(project);
      console.log('更新成功,返回数据:', JSON.stringify(updatedProject, null, 2));
      return updatedProject;
    } catch (error) {
      console.error('更新失败:', error);
      throw error;
    }
  }

  async remove(id: string) {
    console.log('删除项目，ID:', id);
    
    const project = await this.findOne(id);
    const result = await this.projectRepository.remove(project);
    console.log('删除成功，返回数据:', result);
    
    return result;
  }

  async verifyProject(name: string, password: string) {
    console.log('验证项目密码，项目名:', name);
    
    const project = await this.projectRepository.findOne({
      where: { name }
    });

    if (!project) {
      console.log('项目不存在');
      throw new NotFoundException('项目不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, project.password);
    if (!isPasswordValid) {
      console.log('项目密码错误');
      throw new NotFoundException('项目密码错误');
    }

    console.log('验证成功，返回数据:', project);
    return project;
  }

  async updatePrerequisite(id: string, prerequisiteDto: {
    deliverables: string;
    status: number;
  }) {
    console.log('开始更新项目前置条件, ID:', id);
    console.log('前置条件数据:', JSON.stringify(prerequisiteDto, null, 2));

    // 查找项目
    const project = await this.findOne(id);
    
    // 确保status是有效的枚举值
    let status = prerequisiteDto.status;
    if (status === null || status === undefined) {
      status = 0; // 默认为未开始状态
      console.log('状态值为null或undefined，已设置为默认值0');
    }
    
    // 更新前置条件相关字段
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
    } catch (error) {
      console.error('更新前置条件失败:', error);
      throw error;
    }
  }

  async updateResult(id: string, resultDto: {
    results: Array<{ id?: number; description: string }>
  }) {
    console.log('开始更新项目成果, ID:', id);
    console.log('成果数据:', JSON.stringify(resultDto, null, 2));

    // 查找项目
    const project = await this.findOne(id);
    
    // 更新成果字段
    project.results = resultDto.results;

    console.log('准备保存的项目数据:', JSON.stringify({
      results: project.results
    }, null, 2));

    try {
      const updatedProject = await this.projectRepository.save(project);
      console.log('成果更新成功,返回数据:', JSON.stringify(updatedProject, null, 2));
      return updatedProject;
    } catch (error) {
      console.error('更新成果失败:', error);
      throw error;
    }
  }
} 