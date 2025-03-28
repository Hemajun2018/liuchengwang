<template>
  <div class="material-list-container">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">材料管理</h2>
        <span class="node-info">
          <span class="project-name">{{ projectName }}</span>
          <el-divider direction="vertical" />
          <span class="node-name">{{ nodeName }}</span>
        </span>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="openMaterialDialog()">
          <el-icon><Plus /></el-icon> 添加材料
        </el-button>
      </div>
    </div>

    <!-- 材料列表 -->
    <el-card v-loading="loading" class="material-list-card">
      <el-table
        :data="materials"
        style="width: 100%"
        border
        v-if="materials.length > 0"
      >
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column prop="name" label="材料名称" min-width="150" />
        <el-table-column prop="description" label="材料说明" min-width="300" show-overflow-tooltip />
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click="openMaterialDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="deleteMaterial(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="暂无材料数据" />
    </el-card>

    <!-- 材料表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑材料' : '添加材料'"
      width="500px"
    >
      <el-form
        ref="materialFormRef"
        :model="materialForm"
        :rules="materialRules"
        label-width="80px"
        status-icon
      >
        <!-- 材料名称 -->
        <el-form-item label="材料名称" prop="name">
          <el-input v-model="materialForm.name" placeholder="请输入材料名称" />
        </el-form-item>

        <!-- 材料说明 -->
        <el-form-item label="材料说明" prop="description">
          <el-input
            v-model="materialForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入材料说明"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveMaterial" :loading="saveLoading">
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

const loading = ref(false);
const saveLoading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const materialFormRef = ref<FormInstance>();

// 项目和节点信息
const projectName = ref('项目名称');
const nodeName = ref('节点名称');

// 材料表单数据
const materialForm = reactive({
  id: '',
  name: '',
  description: ''
});

// 表单验证规则
const materialRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入材料名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度应为2-50个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入材料说明', trigger: 'blur' },
    { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
  ]
});

// 材料数据
const materials = ref([
  {
    id: '1',
    name: '需求文档',
    description: '详细描述系统功能和非功能需求的文档'
  },
  {
    id: '2',
    name: '原型设计',
    description: '用户界面交互原型设计文件'
  },
  {
    id: '3',
    name: '技术方案',
    description: '系统架构和技术选型方案'
  }
]);

// 初始化
onMounted(() => {
  fetchNodeInfo();
  fetchMaterials();
});

// 获取节点信息
const fetchNodeInfo = () => {
  // TODO: 实际项目中应该调用API获取节点信息
  // 这里使用模拟数据
  setTimeout(() => {
    projectName.value = '流程王开发项目';
    nodeName.value = '需求分析';
  }, 300);
};

// 获取材料列表
const fetchMaterials = () => {
  loading.value = true;
  // TODO: 实际项目中应该调用API获取材料列表
  // 这里使用模拟数据已经在上面定义
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

// 打开材料对话框
const openMaterialDialog = (material?: any) => {
  // 重置表单
  if (materialFormRef.value) {
    materialFormRef.value.resetFields();
  }
  
  if (material) {
    // 编辑模式
    isEdit.value = true;
    Object.assign(materialForm, { ...material });
  } else {
    // 创建模式
    isEdit.value = false;
    materialForm.id = '';
    materialForm.name = '';
    materialForm.description = '';
  }
  
  dialogVisible.value = true;
};

// 保存材料
const handleSaveMaterial = async () => {
  if (!materialFormRef.value) return;
  
  await materialFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        saveLoading.value = true;
        
        // TODO: 实际项目中应该调用API保存材料
        setTimeout(() => {
          if (isEdit.value) {
            // 编辑已有材料
            const index = materials.value.findIndex(n => n.id === materialForm.id);
            if (index !== -1) {
              materials.value[index] = {
                ...materials.value[index],
                name: materialForm.name,
                description: materialForm.description
              };
            }
            ElMessage.success('材料更新成功');
          } else {
            // 创建新材料
            const newMaterial = {
              id: `${Date.now()}`, // 模拟生成新ID
              name: materialForm.name,
              description: materialForm.description
            };
            materials.value.push(newMaterial);
            ElMessage.success('材料添加成功');
          }
          
          dialogVisible.value = false;
          saveLoading.value = false;
        }, 500);
      } catch (error) {
        console.error('保存材料失败:', error);
        ElMessage.error('操作失败，请稍后重试');
        saveLoading.value = false;
      }
    }
  });
};

// 删除材料
const deleteMaterial = (materialId: string) => {
  ElMessageBox.confirm(
    '确定要删除该材料吗？删除后将无法恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // TODO: 实际项目中应该调用API删除材料
      const index = materials.value.findIndex(n => n.id === materialId);
      if (index !== -1) {
        materials.value.splice(index, 1);
      }
      ElMessage.success('材料删除成功');
    })
    .catch(() => {
      // 取消删除
    });
};
</script>

<style scoped>
.material-list-container {
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

.material-list-card {
  margin-bottom: 20px;
}
</style> 