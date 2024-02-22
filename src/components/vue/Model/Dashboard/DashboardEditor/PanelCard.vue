<template>
  <el-card>
    <template #header>
      Panel
    </template>

    <ul>
      <li>name: {{ name }}</li>
      <li>
        datasetId: {{ datasetId }}
        <el-button @click="$emit('update:datasetId', nanoid())">
          Update
        </el-button>
      </li>
      <li>type: {{ type }}</li>
    </ul>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElButton } from 'element-plus';
import { nanoid } from "nanoid";
//define Presentational Model
export type Props = {
  name: string | undefined;
  datasetId: string | undefined;
  type: "kpi" | "timeseries" | "ranking";
}

defineOptions({
  name: "PanelCard",
})
defineProps<Props>()
defineEmits<{
  (e: "update:datasetId", datasetId: string): void;
}>()

</script>
