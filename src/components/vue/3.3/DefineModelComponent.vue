<template>
  <el-form-item label="modelValue">
    <el-input v-model="modelValue" />
  </el-form-item>
  <el-form-item label="count">
    <el-input v-model.number="count" type="number" />
  </el-form-item>
  <el-form-item label="visible">
    <el-switch v-model="visible" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { useModel } from "vue";
import { ElFormItem, ElInput, ElSwitch } from "element-plus"

const props = defineProps<{
  visible: boolean;
}>()
defineEmits<{
  (e: "update:visible", value: boolean): void;
}>()

// default model (consumed via `v-model`)
const modelValue = defineModel<string>({ required:true })

// local mutable model, can be mutated locally
// even if the parent did not pass the matching `v-model`.
const count = defineModel<number>('count', { local: true, default: 0 })

const visible = useModel(props, 'visible');

</script>
