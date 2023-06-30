<template>
  <el-card>
    <template #header>
      Panel
    </template>

    <ul>
      <li>name: {{ name }}</li>
      <li>datasetId: {{ datasetId }}</li>
      <li>type: {{ type }}</li>
    </ul>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus';
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

</script>
