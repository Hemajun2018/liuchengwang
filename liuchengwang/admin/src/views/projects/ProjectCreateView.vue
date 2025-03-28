<template>
  <div class="project-create-container">
    <div class="page-header">
      <h2 class="page-title">创建项目</h2>
    </div>

    <el-card class="form-container">
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
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            创建项目
          </el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { createProject } from '@/api/project';

const router = useRouter();
const loading = ref(false);
const projectFormRef = ref<FormInstance>();

// 项目表单数据
const projectForm = reactive({
  name: '',
  password: ''
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

// 提交表单
const handleSubmit = async () => {
  if (!projectFormRef.value) return;

  await projectFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;

        // 调用创建项目API
        await createProject({
          name: projectForm.name,
          password: projectForm.password
        });

        // 显示成功消息并返回列表页
        ElMessage.success('项目创建成功');
        router.push('/projects');
      } catch (error) {
        console.error('创建项目失败:', error);
        // 错误处理已经在request.ts的响应拦截器中处理
      } finally {
        loading.value = false;
      }
    }
  });
};

// 返回项目列表
const goBack = () => {
  router.push('/projects');
};
</script>

<style scoped>
.project-create-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.form-container {
  max-width: 800px;
}
</style> 