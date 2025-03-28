<template>
  <div class="node-descriptions-list">
    <div v-if="descriptions.length > 0">
      <div v-for="(desc, index) in descriptions" :key="index" class="node-description-item">
        {{ index + 1 }}. {{ desc }}
      </div>
    </div>
    <span v-else>{{ fallback || '无描述' }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  descriptions?: string[];
  fallback?: string;
}>();

const descriptions = computed(() => {
  if (props.descriptions && Array.isArray(props.descriptions) && props.descriptions.length > 0) {
    return props.descriptions.filter(desc => desc && desc.trim());
  }
  return [];
});
</script>

<style scoped>
.node-descriptions-list {
  width: 100%;
}

.node-description-item {
  margin-bottom: 8px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  line-height: 1.5;
  display: block;
}

.node-description-item:last-child {
  margin-bottom: 0;
}
</style> 