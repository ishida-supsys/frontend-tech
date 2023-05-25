<template>
  <el-input :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
import { ElInput } from "element-plus"
defineOptions({
  name: "ShortEmitsComponent",
})

defineProps<{
  modelValue: string,
}>()

defineEmits<{
  "update:modelValue": [value: string],
}>()
</script>