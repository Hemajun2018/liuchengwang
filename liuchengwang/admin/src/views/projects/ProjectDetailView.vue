<template>
  <div class="project-detail-container">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">项目详情</h2>
        <span class="project-status" :class="getStatusClass">{{ statusText }}</span>
      </div>
      <div class="header-actions">
        <el-button-group>
          <el-button type="primary" @click="editMode = !editMode">
            {{ editMode ? '取消编辑' : '编辑项目' }}
          </el-button>
          <el-button type="primary" @click="manageNodes">节点管理</el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 编辑模式 - 表单 -->
    <el-card v-if="editMode" class="form-container">
      <el-form
        ref="projectFormRef"
        :model="projectForm"
        :rules="projectRules"
        label-width="120px"
        label-position="right"
        status-icon
      >
        <!-- 项目名称 -->
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name" placeholder="请输入项目名称" />
        </el-form-item>

        <!-- 项目查询密码 -->
        <el-form-item label="项目查询密码" prop="password">
          <el-input
            v-model="projectForm.password"
            placeholder="设置员工查询项目时需要使用的密码"
            show-password
          />
        </el-form-item>

        <!-- 表单操作 -->
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSave">
            保存
          </el-button>
          <el-button @click="editMode = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查看模式 - 信息展示 -->
    <el-card v-else class="info-container">
      <div class="info-section">
        <div class="info-header">基本信息</div>
        <div class="info-content">
          <div class="info-item">
            <span class="info-label">项目名称</span>
            <span class="info-value">{{ projectData.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">项目状态</span>
            <span class="info-value" :class="getStatusClass">{{ statusText }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">项目查询密码</span>
            <span class="info-value password-value">********</span>
          </div>
        </div>
      </div>

      <!-- 前置条件信息 -->
      <div class="info-section">
        <div class="info-header-with-actions">
          <div class="info-header">前置条件</div>
          <el-button type="primary" size="small" @click="showPrerequisiteDialog = true">
            管理前置条件
          </el-button>
        </div>
        <div class="info-content">
          <el-table v-if="prerequisites.length > 0" :data="prerequisites" style="width: 100%">
            <el-table-column prop="content" label="需交付内容" min-width="200" />
            <el-table-column prop="startDate" label="开始日期" width="120">
              <template #default="scope">
                {{ scope.row.startDate || '未设置' }}
              </template>
            </el-table-column>
            <el-table-column prop="endDate" label="预计结束日期" width="120">
              <template #default="scope">
                {{ scope.row.endDate || '未设置' }}
              </template>
            </el-table-column>
            <el-table-column prop="durationDays" label="预计天数" width="100">
              <template #default="scope">
                {{ scope.row.durationDays || '0' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="getPrerequisiteStatusType(scope.row.status)">
                  {{ getPrerequisiteStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-else description="暂无前置条件" />
        </div>
      </div>

      <div class="info-section">
        <div class="info-header">节点信息</div>
        <div class="info-content">
          <div class="node-list" v-if="nodes.length > 0">
            <div class="node-item" v-for="(node, index) in nodes" :key="node.id">
              <div class="node-index">{{ index + 1 }}</div>
              <div class="node-content">
                <div class="node-name">{{ node.name }}</div>
                <div class="node-status" :class="getNodeStatusClass(node.status)">
                  {{ getNodeStatusText(node.status) }}
                </div>
              </div>
            </div>
          </div>
          <el-empty v-else description="暂无节点数据" />
        </div>
      </div>
    </el-card>

    <!-- 前置条件管理对话框 -->
    <el-dialog
      v-model="showPrerequisiteDialog"
      title="前置条件管理"
      width="800px"
      destroy-on-close
    >
      <div class="prerequisite-dialog-content">
        <div class="prerequisite-list">
          <div v-for="(item, index) in prerequisites" :key="item.id" class="prerequisite-item">
            <div class="prerequisite-header">
              <span class="prerequisite-title">前置条件 #{{ index + 1 }}</span>
              <el-button type="danger" size="small" @click="handleDeletePrerequisite(item.id)">
                删除
              </el-button>
            </div>
            <el-form :model="item" label-width="120px">
              <el-form-item label="需交付内容">
                <el-input v-model="item.content" type="textarea" rows="2" />
              </el-form-item>
              <el-form-item label="开始日期">
                <el-date-picker
                  v-model="item.startDate"
                  type="date"
                  placeholder="选择开始日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  @change="calculateDuration(item)"
                />
              </el-form-item>
              <el-form-item label="预计结束日期">
                <el-date-picker
                  v-model="item.endDate"
                  type="date"
                  placeholder="选择预计结束日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  @change="calculateDuration(item)"
                />
              </el-form-item>
              <el-form-item label="预计天数">
                <el-input v-model="item.durationDays" disabled />
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="item.status">
                  <el-option label="未开始" value="pending" />
                  <el-option label="进行中" value="in_progress" />
                  <el-option label="已完成" value="completed" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleUpdatePrerequisite(item)">
                  保存
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="add-prerequisite">
          <el-divider>添加新前置条件</el-divider>
          <el-form :model="newPrerequisite" label-width="120px">
            <el-form-item label="需交付内容" required>
              <el-input v-model="newPrerequisite.content" type="textarea" rows="2" />
            </el-form-item>
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="newPrerequisite.startDate"
                type="date"
                placeholder="选择开始日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="calculateDuration(newPrerequisite)"
              />
            </el-form-item>
            <el-form-item label="预计结束日期">
              <el-date-picker
                v-model="newPrerequisite.endDate"
                type="date"
                placeholder="选择预计结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="calculateDuration(newPrerequisite)"
              />
            </el-form-item>
            <el-form-item label="预计天数">
              <el-input v-model="newPrerequisite.durationDays" disabled />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAddPrerequisite">
                添加
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { getProject, updateProject } from '@/api/project';
import { 
  getPrerequisites, 
  createPrerequisite, 
  updatePrerequisite, 
  deletePrerequisite,
  type PrerequisiteUI,
  toPrerequisiteDTO
} from '@/api/prerequisite';
import { differenceInDays } from 'date-fns';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const editMode = ref(false);
const projectFormRef = ref<FormInstance>();

// 项目ID
const projectId = computed(() => route.params.id as string);

// 项目表单数据（编辑模式）
const projectForm = reactive({
  name: '',
  password: ''
});

// 项目数据（查看模式）
const projectData = reactive({
  id: '',
  name: '',
  deliverables: '',
  startTime: '',
  daysNeeded: 30,
  expectedEndTime: '',
  status: 0,
  password: ''
});

// 节点数据
const nodes = ref([
  {
    id: '1',
    name: '需求分析',
    status: 2
  },
  {
    id: '2',
    name: '设计阶段',
    status: 1
  },
  {
    id: '3',
    name: '开发阶段',
    status: 0
  }
]);

// 前置条件数据
const prerequisites = ref<PrerequisiteUI[]>([]);
const showPrerequisiteDialog = ref(false);
const newPrerequisite = reactive<Partial<PrerequisiteUI>>({
  content: '',
  startDate: '',
  endDate: '',
  durationDays: 0
});

// 表单验证规则
const projectRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度应为2-50个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置项目查询密码', trigger: 'blur' },
    { min: 4, max: 20, message: '密码长度应为4-20个字符', trigger: 'blur' }
  ]
});

// 状态映射
const statusMap: Record<number, string> = {
  0: '未开始',
  1: '进行中',
  2: '已完成',
  3: '已延期'
};

// 状态样式映射
const statusClassMap: Record<number, string> = {
  0: 'status-pending',
  1: 'status-progress',
  2: 'status-completed',
  3: 'status-delayed'
};

// 状态文本
const statusText = computed(() => {
  return statusMap[projectData.status] || '未知状态';
});

// 状态样式类
const getStatusClass = computed(() => {
  return statusClassMap[projectData.status] || '';
});

// 初始化
onMounted(() => {
  fetchProjectDetails();
  fetchPrerequisites();
});

// 获取项目详情
const fetchProjectDetails = async () => {
  loading.value = true;

  try {
    const project = await getProject(projectId.value);
    
    // 更新项目数据
    Object.assign(projectData, project);
    // 只同步需要编辑的字段到表单数据
    projectForm.name = project.name;
    projectForm.password = project.password;
  } catch (error) {
    console.error('获取项目详情失败:', error);
    // 错误处理已经在request.ts的响应拦截器中处理
  } finally {
    loading.value = false;
  }
};

// 获取前置条件列表
const fetchPrerequisites = async () => {
  try {
    const data = await getPrerequisites(projectId.value);
    prerequisites.value = data;
  } catch (error) {
    console.error('获取前置条件失败:', error);
  }
};

// 计算天数
const calculateDuration = (item: any) => {
  if (item.startDate && item.endDate) {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    item.durationDays = differenceInDays(endDate, startDate);
  }
};

// 添加前置条件
const handleAddPrerequisite = async () => {
  if (!newPrerequisite.content) {
    ElMessage.warning('请输入需交付内容');
    return;
  }

  try {
    await createPrerequisite({
      project_id: projectId.value,
      content: newPrerequisite.content,
      startDate: newPrerequisite.startDate || undefined,
      endDate: newPrerequisite.endDate || undefined
    });
    
    ElMessage.success('添加前置条件成功');
    
    // 重置表单
    newPrerequisite.content = '';
    newPrerequisite.startDate = '';
    newPrerequisite.endDate = '';
    newPrerequisite.durationDays = 0;
    
    // 刷新列表
    fetchPrerequisites();
  } catch (error) {
    console.error('添加前置条件失败:', error);
  }
};

// 更新前置条件
const handleUpdatePrerequisite = async (item: PrerequisiteUI) => {
  try {
    const dto = toPrerequisiteDTO(item);
    await updatePrerequisite(item.id, dto);
    
    ElMessage.success('更新前置条件成功');
    
    // 刷新列表
    fetchPrerequisites();
  } catch (error) {
    console.error('更新前置条件失败:', error);
  }
};

// 删除前置条件
const handleDeletePrerequisite = async (id: number) => {
  try {
    await deletePrerequisite(id);
    
    ElMessage.success('删除前置条件成功');
    
    // 刷新列表
    fetchPrerequisites();
  } catch (error) {
    console.error('删除前置条件失败:', error);
  }
};

// 获取前置条件状态文本
const getPrerequisiteStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': '未开始',
    'in_progress': '进行中',
    'completed': '已完成'
  };
  return statusMap[status] || '未知状态';
};

// 获取前置条件状态类型
const getPrerequisiteStatusType = (status: string) => {
  const typeMap: Record<string, string> = {
    'pending': 'info',
    'in_progress': 'warning',
    'completed': 'success'
  };
  return typeMap[status] || '';
};

// 保存项目信息
const handleSave = async () => {
  if (!projectFormRef.value) return;

  await projectFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;

        // 调用更新项目API
        const updatedProject = await updateProject(projectId.value, {
          name: projectForm.name,
          password: projectForm.password
        });
        
        // 更新视图数据
        Object.assign(projectData, updatedProject);
        
        ElMessage.success('项目更新成功');
        editMode.value = false;
      } catch (error) {
        console.error('更新项目失败:', error);
        // 错误处理已经在request.ts的响应拦截器中处理
      } finally {
        loading.value = false;
      }
    }
  });
};

// 节点状态文本
const getNodeStatusText = (status: number) => {
  return statusMap[status] || '未知状态';
};

// 节点状态样式类
const getNodeStatusClass = (status: number) => {
  return statusClassMap[status] || '';
};

// 管理节点
const manageNodes = () => {
  router.push(`/projects/${projectId.value}/nodes`);
};
</script>

<style scoped>
.project-detail-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  margin-right: 15px;
}

.project-status {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
}

.form-container,
.info-container {
  margin-bottom: 20px;
}

.info-section {
  margin-bottom: 24px;
}

.info-header {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  margin-bottom: 15px;
}

.info-label {
  width: 120px;
  color: #606266;
  font-size: 14px;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #303133;
}

.password-value {
  letter-spacing: 2px;
}

.node-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.node-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.node-index {
  width: 32px;
  height: 32px;
  background-color: #3a7bff;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-weight: bold;
}

.node-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.node-name {
  font-weight: 500;
}

.node-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

/* 状态颜色 */
.status-pending {
  background-color: #f4f4f5;
  color: #909399;
}

.status-progress {
  background-color: #ecf5ff;
  color: #3a7bff;
}

.status-completed {
  background-color: #f0f9eb;
  color: #67c23a;
}

.status-delayed {
  background-color: #fef0f0;
  color: #f56c6c;
}

.info-header-with-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;
}

.prerequisite-dialog-content {
  max-height: 600px;
  overflow-y: auto;
}

.prerequisite-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.prerequisite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.prerequisite-title {
  font-weight: bold;
  font-size: 16px;
}

.add-prerequisite {
  margin-top: 20px;
}
</style> 