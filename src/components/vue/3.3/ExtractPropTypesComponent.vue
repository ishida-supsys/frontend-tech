<template>
  <el-input v-bind="$props" />
</template>

<script lang="ts" setup>
import { ExtractPropTypes } from "vue";
import { ElInput } from "element-plus";

const props = ()=>({
  modelValue: {
    type: String,
    required: true,
  },
})
defineProps<ExtractPropTypes<ReturnType<typeof props>>>()
</script>
