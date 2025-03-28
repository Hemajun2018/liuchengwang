<template>
  <div class="dashboard-container">
    <el-row :gutter="16">
      <!-- 统计卡片 -->
      <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(item, index) in statisticsData" :key="index">
        <el-card class="statistics-card" :body-style="{ padding: '16px' }">
          <div class="card-content">
            <div class="card-icon" :style="{ backgroundColor: item.color }">
              <el-icon><component :is="item.icon" /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="chart-row">
      <!-- 项目状态分布 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>项目状态分布</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里将来放置图表组件 -->
            <div class="placeholder-chart">
              <el-empty description="暂无数据" />
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 最近活动 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <div class="activity-list">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in recentActivities"
                :key="index"
                :timestamp="activity.time"
                :type="activity.type"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="table-row">
      <!-- 最近项目 -->
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近项目</span>
              <el-button class="button" text @click="goToProjects">
                查看全部
              </el-button>
            </div>
          </template>
          <el-table :data="recentProjects" style="width: 100%">
            <el-table-column prop="name" label="项目名称" />
            <el-table-column prop="startTime" label="开始时间" width="180" />
            <el-table-column prop="expectedEndTime" label="预计完成时间" width="180" />
            <el-table-column prop="status" label="状态" width="120">
              <template #default="scope">
                <el-tag
                  :type="getStatusType(scope.row.status)"
                  effect="light"
                >
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="viewProject(scope.row.id)"
                >
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 统计数据
const statisticsData = ref([
  {
    title: '总项目数',
    value: 12,
    icon: 'Folder',
    color: '#409EFF'
  },
  {
    title: '进行中项目',
    value: 5,
    icon: 'Loading',
    color: '#67C23A'
  },
  {
    title: '已完成项目',
    value: 6,
    icon: 'Check',
    color: '#E6A23C'
  },
  {
    title: '已延期项目',
    value: 1,
    icon: 'Warning',
    color: '#F56C6C'
  }
]);

// 最近活动
const recentActivities = ref([
  {
    content: '创建了项目"流程王开发"',
    time: '2024-03-09 10:00',
    type: 'primary'
  },
  {
    content: '更新了项目"客户管理系统"的节点',
    time: '2024-03-08 15:30',
    type: 'success'
  },
  {
    content: '添加了"产品设计"的问题',
    time: '2024-03-07 09:45',
    type: 'warning'
  },
  {
    content: '完成了"数据分析平台"项目',
    time: '2024-03-06 16:20',
    type: 'success'
  }
]);

// 最近项目
const recentProjects = ref([
  {
    id: '1',
    name: '流程王开发',
    startTime: '2024-03-09',
    expectedEndTime: '2024-04-08',
    status: 1
  },
  {
    id: '2',
    name: '客户管理系统',
    startTime: '2024-02-15',
    expectedEndTime: '2024-03-30',
    status: 1
  },
  {
    id: '3',
    name: '数据分析平台',
    startTime: '2024-01-10',
    expectedEndTime: '2024-03-05',
    status: 2
  },
  {
    id: '4',
    name: '移动应用开发',
    startTime: '2024-02-01',
    expectedEndTime: '2024-02-28',
    status: 3
  }
]);

// 获取状态类型
const getStatusType = (status: number) => {
  switch (status) {
    case 0: return 'info';    // 未开始
    case 1: return 'primary'; // 进行中
    case 2: return 'success'; // 已完成
    case 3: return 'danger';  // 已延期
    default: return 'info';
  }
};

// 获取状态文本
const getStatusText = (status: number) => {
  switch (status) {
    case 0: return '未开始';
    case 1: return '进行中';
    case 2: return '已完成';
    case 3: return '已延期';
    default: return '未知';
  }
};

// 查看项目详情
const viewProject = (id: string) => {
  router.push(`/projects/${id}`);
};

// 跳转到项目列表
const goToProjects = () => {
  router.push('/projects');
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.statistics-card {
  margin-bottom: 20px;
  height: 100%;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.card-icon .el-icon {
  font-size: 30px;
  color: #fff;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  height: 400px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.activity-list {
  height: 320px;
  overflow-y: auto;
}

.table-row {
  margin-bottom: 20px;
}
</style> 