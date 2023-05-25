<template>
  <el-select v-model="modelValue">
    <el-option v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script setup lang="ts" generic="T extends string">
import { ElSelect, ElOption } from 'element-plus';

defineProps<{
  items: { label:string, value:T }[];
}>()

const modelValue = defineModel<T>()
</script>