<template>
  <el-select v-model="modelValue">
    <el-option v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>

<script setup lang="ts" generic="T extends string">
import { useModel } from "vue";
import { ElSelect, ElOption } from 'element-plus';

const props = defineProps<{
  items: { label:string, value:T }[];
  modelValue: T;
}>()
defineEmits<{
  "updateModelValue": [value: T],
}>()

const modelValue = useModel(props, 'modelValue')
</script>