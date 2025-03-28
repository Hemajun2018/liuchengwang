import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '../../database/entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: {
    name: string;
    password: string;
  }) {
    console.log('收到创建项目请求:', createProjectDto);
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() query: {
    page?: string;
    pageSize?: string;
    keyword?: string;
    status?: string;
  }) {
    console.log('收到获取项目列表请求, 参数:', query);
    return this.projectService.findAll({
      page: query.page ? parseInt(query.page) : undefined,
      pageSize: query.pageSize ? parseInt(query.pageSize) : undefined,
      keyword: query.keyword,
      status: query.status
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('收到获取单个项目请求, id:', id);
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Partial<Project>) {
    console.log('收到更新项目请求, id:', id);
    console.log('更新数据:', JSON.stringify(updateProjectDto, null, 2));
    
    // 如果包含日期字段,打印格式
    if(updateProjectDto.start_time) {
      console.log('开始时间格式:', updateProjectDto.start_time, typeof updateProjectDto.start_time);
    }
    if(updateProjectDto.end_time) {
      console.log('结束时间格式:', updateProjectDto.end_time, typeof updateProjectDto.end_time);
    }
    if(updateProjectDto.days_needed !== undefined) {
      console.log('所需天数:', updateProjectDto.days_needed, typeof updateProjectDto.days_needed);
    }
    
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('收到删除项目请求, id:', id);
    return this.projectService.remove(id);
  }

  @Post('verify')
  verifyProject(@Body() verifyDto: { name: string; password: string }) {
    console.log('收到验证项目请求:', verifyDto);
    return this.projectService.verifyProject(verifyDto.name, verifyDto.password);
  }

  @Patch(':id/prerequisite')
  async updatePrerequisite(
    @Param('id') id: string,
    @Body() prerequisiteDto: {
      deliverables: string;
      status: number;
    }
  ) {
    console.log('收到更新前置条件请求:', {
      id,
      prerequisiteDto: JSON.stringify(prerequisiteDto, null, 2)
    });
    return this.projectService.updatePrerequisite(id, prerequisiteDto);
  }

  @Patch(':id/result')
  async updateResult(
    @Param('id') id: string,
    @Body() resultDto: {
      results: Array<{ id?: number; description: string }>
    }
  ) {
    console.log('收到更新项目成果请求:', {
      id,
      resultDto: JSON.stringify(resultDto, null, 2)
    });
    return this.projectService.updateResult(id, resultDto);
  }
} 