<template>
  <div class="issue-list-container">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">问题管理</h2>
        <span class="node-info">
          <span class="project-name">{{ projectName }}</span>
          <el-divider direction="vertical" />
          <span class="node-name">{{ nodeName }}</span>
        </span>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="openIssueDialog()">
          <el-icon><Plus /></el-icon> 添加问题
        </el-button>
      </div>
    </div>

    <!-- 问题列表 -->
    <el-card v-loading="loading" class="issue-list-card">
      <el-table
        :data="issues"
        style="width: 100%"
        border
        v-if="issues.length > 0"
      >
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column prop="description" label="问题描述" min-width="300" show-overflow-tooltip />
        <el-table-column label="开始时间" width="120" align="center">
          <template #default="scope">
            {{ scope.row.startDate ? new Date(scope.row.startDate).toLocaleDateString() : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="120" align="center">
          <template #default="scope">
            {{ scope.row.expectedEndDate ? new Date(scope.row.expectedEndDate).toLocaleDateString() : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="完成天数" width="100" align="center">
          <template #default="scope">
            {{ scope.row.durationDays || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'warning' : 'success'"
              effect="light"
            >
              {{ scope.row.status === 0 ? '待解决' : '已解决' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click="openIssueDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="deleteIssue(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="暂无问题数据" />
    </el-card>

    <!-- 问题表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑问题' : '添加问题'"
      width="500px"
    >
      <el-form
        ref="issueFormRef"
        :model="issueForm"
        :rules="issueRules"
        label-width="80px"
        status-icon
      >
        <!-- 问题描述 -->
        <el-form-item label="问题描述" prop="description">
          <el-input
            v-model="issueForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入问题描述"
          />
        </el-form-item>

        <!-- 问题状态 -->
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="issueForm.status">
            <el-radio :label="0">待解决</el-radio>
            <el-radio :label="1">已解决</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 开始日期 -->
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker
            v-model="issueForm.startDate"
            type="date"
            placeholder="选择开始时间"
            value-format="YYYY-MM-DD"
            @change="handleStartDateChange"
          />
        </el-form-item>

        <!-- 结束日期 -->
        <el-form-item label="结束时间" prop="expectedEndDate">
          <el-date-picker
            v-model="issueForm.expectedEndDate"
            type="date"
            placeholder="选择结束时间"
            value-format="YYYY-MM-DD"
            :disabled-date="disableEndDateBefore"
            @change="handleEndDateChange"
          />
        </el-form-item>

        <!-- 完成天数 -->
        <el-form-item label="完成天数" prop="durationDays">
          <el-input-number
            v-model="issueForm.durationDays"
            :min="1"
            :disabled="!issueForm.startDate"
            @change="handleDurationChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveIssue" :loading="saveLoading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

// 问题数据接口
interface Issue {
  id: string;
  description: string;
  status: number;
  startDate: string;
  expectedEndDate: string;
  durationDays: number | undefined;
}

const loading = ref(false);
const saveLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const issueFormRef = ref<FormInstance>();

// 项目和节点信息
const projectName = ref('项目名称');
const nodeName = ref('节点名称');

// 问题数据
const issues = ref<Issue[]>([
  {
    id: '1',
    description: '页面加载速度慢，需要优化',
    status: 0,
    startDate: '2024-03-15',
    expectedEndDate: '2024-03-20',
    durationDays: 5
  },
  {
    id: '2',
    description: '用户反馈表单提交后没有成功提示',
    status: 0,
    startDate: '2024-03-16',
    expectedEndDate: '2024-03-18',
    durationDays: 2
  },
  {
    id: '3',
    description: '移动端适配问题，部分元素显示不全',
    status: 1,
    startDate: '2024-03-10',
    expectedEndDate: '2024-03-25',
    durationDays: 15
  }
] as Issue[]);

// 问题表单数据
const issueForm = reactive<Omit<Issue, 'id'> & { id: string | ''}>({
  id: '',
  description: '',
  status: 0,
  startDate: '',
  expectedEndDate: '',
  durationDays: undefined as unknown as number
});

// 表单验证规则
const issueRules = reactive<FormRules>({
  description: [
    { required: true, message: '请输入问题描述', trigger: 'blur' },
    { min: 2, max: 200, message: '长度应为2-200个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择问题状态', trigger: 'change' }
  ],
  startDate: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  expectedEndDate: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ],
  durationDays: [
    { required: true, message: '请输入完成天数', trigger: 'change' }
  ]
});

// 初始化
onMounted(() => {
  fetchNodeInfo();
  fetchIssues();
});

// 获取节点信息
const fetchNodeInfo = () => {
  // TODO: 实际项目中应该调用API获取节点信息
  // 这里使用模拟数据
  setTimeout(() => {
    projectName.value = '流程王开发项目';
    nodeName.value = '开发阶段';
  }, 300);
};

// 获取问题列表
const fetchIssues = () => {
  loading.value = true;
  // TODO: 实际项目中应该调用API获取问题列表
  // 这里使用模拟数据已经在上面定义
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

// 打开问题对话框
const openIssueDialog = (issue?: Issue) => {
  // 重置表单
  if (issueFormRef.value) {
    issueFormRef.value.resetFields();
  }
  
  if (issue) {
    // 编辑模式
    isEdit.value = true;
    Object.assign(issueForm, { ...issue });
  } else {
    // 创建模式
    isEdit.value = false;
    Object.assign(issueForm, {
      id: '',
      description: '',
      status: 0,
      startDate: '',
      expectedEndDate: '',
      durationDays: undefined
    });
  }
  
  dialogVisible.value = true;
};

// 保存问题
const handleSaveIssue = async () => {
  if (!issueFormRef.value) return;
  
  await issueFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        saveLoading.value = true;
        
        // TODO: 实际项目中应该调用API保存问题
        setTimeout(() => {
          if (isEdit.value) {
            // 编辑已有问题
            const index = issues.value.findIndex(n => n.id === issueForm.id);
            if (index !== -1) {
              issues.value[index] = {
                ...issues.value[index],
                description: issueForm.description,
                status: issueForm.status,
                startDate: issueForm.startDate,
                expectedEndDate: issueForm.expectedEndDate,
                durationDays: issueForm.durationDays
              };
            }
            ElMessage.success('问题更新成功');
          } else {
            // 创建新问题
            const newIssue: Issue = {
              id: `${Date.now()}`, // 模拟生成新ID
              description: issueForm.description,
              status: issueForm.status,
              startDate: issueForm.startDate,
              expectedEndDate: issueForm.expectedEndDate,
              durationDays: issueForm.durationDays
            };
            issues.value.push(newIssue);
            ElMessage.success('问题添加成功');
          }
          
          dialogVisible.value = false;
          saveLoading.value = false;
        }, 500);
      } catch (error) {
        console.error('保存问题失败:', error);
        ElMessage.error('操作失败，请稍后重试');
        saveLoading.value = false;
      }
    }
  });
};

// 删除问题
const deleteIssue = (issueId: string) => {
  ElMessageBox.confirm(
    '确定要删除该问题吗？删除后将无法恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // TODO: 实际项目中应该调用API删除问题
      const index = issues.value.findIndex(n => n.id === issueId);
      if (index !== -1) {
        issues.value.splice(index, 1);
      }
      ElMessage.success('问题删除成功');
    })
    .catch(() => {
      // 取消删除
    });
};

// 禁用开始日期之前的结束日期选择
const disableEndDateBefore = (time: Date) => {
  if (!issueForm.startDate) return false;
  return time.getTime() < new Date(issueForm.startDate).getTime();
};

// 处理开始日期变化
const handleStartDateChange = () => {
  if (issueForm.startDate && issueForm.expectedEndDate) {
    const start = new Date(issueForm.startDate);
    const end = new Date(issueForm.expectedEndDate);
    if (end < start) {
      issueForm.expectedEndDate = '';
      issueForm.durationDays = undefined;
    } else {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      issueForm.durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
};

// 处理结束日期变化
const handleEndDateChange = () => {
  if (issueForm.startDate && issueForm.expectedEndDate) {
    const start = new Date(issueForm.startDate);
    const end = new Date(issueForm.expectedEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    issueForm.durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};

// 处理完成天数变化
const handleDurationChange = () => {
  if (issueForm.startDate && issueForm.durationDays) {
    const start = new Date(issueForm.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + issueForm.durationDays);
    issueForm.expectedEndDate = end.toISOString().split('T')[0];
  }
};
</script>

<style scoped>
.issue-list-container {
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
  align-items: baseline;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  margin-right: 15px;
}

.node-info {
  font-size: 16px;
  color: #606266;
  display: flex;
  align-items: center;
}

.node-name {
  font-weight: 500;
}

.issue-list-card {
  margin-bottom: 20px;
}
</style> 