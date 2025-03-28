<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 面包屑数据
const breadcrumbs = ref<{ path: string; title: string }[]>([]);

// 监听路由变化，更新面包屑
watch(
  () => route.path,
  () => {
    const matched = route.matched.filter(item => item.meta && item.meta.title);
    
    breadcrumbs.value = matched.map(item => {
      // 如果是动态标题,使用meta中的projectName
      if (item.meta.dynamicTitle && item.meta.projectName) {
        return {
          path: item.path,
          title: `${item.meta.title} - ${item.meta.projectName}`
        };
      }
      
      // 如果有父级标题,添加到面包屑中
      if (item.meta.parentTitle) {
        return {
          path: item.path,
          title: `${item.meta.parentTitle} / ${item.meta.title}`
        };
      }
      
      return {
        path: item.path,
        title: item.meta.title as string
      };
    });
  },
  { immediate: true }
);

// 处理面包屑点击
const handleBreadcrumbClick = (path: string) => {
  router.push(path);
};
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item 
      v-for="(item, index) in breadcrumbs" 
      :key="index"
      :to="index === breadcrumbs.length - 1 ? null : { path: item.path }"
      @click="index !== breadcrumbs.length - 1 && handleBreadcrumbClick(item.path)"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.el-breadcrumb {
  line-height: 60px;
  font-size: 14px;
}
</style> 