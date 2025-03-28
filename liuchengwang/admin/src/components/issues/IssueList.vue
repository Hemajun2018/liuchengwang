<template>
  <div class="issue-list">
    <el-table v-if="issues && issues.length > 0" :data="issues" style="width: 100%">
      <el-table-column prop="content" label="描述" min-width="300" />
      <el-table-column prop="start_date" label="开始时间" width="120">
        <template #default="{ row }">
          {{ formatDate(row.start_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="expected_end_date" label="结束时间" width="120">
        <template #default="{ row }">
          {{ formatDate(row.expected_end_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="duration_days" label="持续天数" width="100">
        <template #default="{ row }">
          {{ row.duration_days || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'pending' ? 'warning' : 'success'">
            {{ row.status === 'pending' ? '待处理' : '已解决' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="$emit('detail', row)">查看详情</el-button>
          <el-button type="primary" link @click="$emit('edit', row)">编辑</el-button>
          <el-button type="danger" link @click="$emit('delete', nodeId, row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="暂无问题" />
  </div>
</template>

<script setup lang="ts">
import { IssueStatus } from '@/api/node';

interface Issue {
  id: number;
  content: string;
  status: IssueStatus;
  start_date: string | null;
  expected_end_date: string | null;
  duration_days: number | null;
}

defineProps<{
  nodeId: number;
  issues: Issue[];
}>();

defineEmits<{
  (e: 'detail', issue: Issue): void;
  (e: 'edit', issue: Issue): void;
  (e: 'delete', nodeId: number, issueId: number): void;
}>();

const formatDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('zh-CN');
};
</script>

<style scoped>
.issue-list {
  width: 100%;
}
</style> 