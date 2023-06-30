<!--
  # Container Component

  * ViewComponent・QueryComposable・ControllerComposable・PresentationalComponentの連絡係
-->
<template>
  <el-container>
    <el-header>DashboardId</el-header>
    <el-main>
      <dashboard-editor 
        :name="data.name"
        :panels="data.panels" 
        @click:add-panel="addPanel()"
        @click:save="mutate()"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { ElHeader, ElContainer, ElMain } from "element-plus"
import { useFetchDashboard, useUpdateDashboard } from "@/composables/Model/use-dashboard"
import DashboardEditor from "@/components/vue/Model/Dashboard/DashboardEditor.vue";
import { useDashboardEditor } from "@/composables/Model/use-dashboard-editor";
defineOptions({
  name: "DashboardContainer"
})
//View Componentからのパラメータ
const props = defineProps<{
  id: number;
}>()
const id = toRef(props, "id")

//use Query Composable
const {
  dashboard,
} = useFetchDashboard(id);

//use Controller Composable
const { data, addPanel, updatedDashboard } = useDashboardEditor(dashboard)

//use Query Composable
const {
  mutate,
} = useUpdateDashboard(updatedDashboard)

//依存関係的に
//defineProps -> useFetchXXXX -> ControllerComposable -> useUpdateXXXX
//の順番になりそう。循環参照になった時にどうする？

</script>
