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
        @update:panel-dataset-id="updatePanelDatasetId"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from "vue";
import { ElHeader, ElContainer, ElMain } from "element-plus"
import { useFetchDashboard, useUpdateDashboard } from "@/composables/Model/use-dashboard"
import DashboardEditor from "@/components/vue/Model/Dashboard/DashboardEditor.vue";
import { useDashboardEditor } from "@/composables/Model/use-dashboard-editor";
import { useFetchDatasets } from "@/composables/Model/use-dataset";
import invariant from "tiny-invariant";
defineOptions({
  name: "DashboardContainer"
})
//View Componentからのパラメータ
const props = defineProps<{
  id: number;
}>()
const id = toRef(props, "id")
watch(id, ()=>{
  datasetIds.value = [];
})

//use Query Composable ////////////////////////////////////
const {
  dashboard,
} = useFetchDashboard(id);

const datasetIds = ref<string[]>([]); //これはuseFetchDatasetsに寄せる方法もありそう
const { datasets } = useFetchDatasets(datasetIds, {
  //このQueryComposableを使う目的はここを読めばわかる。
  //よって単一処理推奨。もし別の目的で同一のcomposableを使う場合は、onSuccess内の分岐ではなく、
  //composableを必要な箇所の分呼ぶのが良い。
  //なお、onSuccessはuseQueryのcacheを利用する場合は呼ばれないので注意。
  onSuccess (data) {
    updateDefaultPanelNameByDataset(data.id, data.name);
  },
});

//use Controller Composable ///////////////////////////////
const { 
  data, 
  addPanel, 
  updatedDashboard,
  updatePanelDatasetId,
  updateDefaultPanelNameByDataset, 
} = useDashboardEditor(dashboard, {
  /*
    NOTE: イベント循環戦略
    たとえば「セットしたデータセットの名前をパネルの名前にセットする」とした場合、処理は以下のようになる。
    1. dashboard.panels[i].datasetIdが変更される
    2. datasetIdに対応するデータセットを取得する
    3. データセットの名前をdashboard.panels[i].nameにセットする

    この時、composable同士のmodelの循環参照が発生するため、ref変数だけで対応するのは困難。
    (どちらかのref変数が初期化されていない旨の実行エラーが発生する)
    そこで、お互いにイベント関数を定義し、後続の処理を渡し合うことで循環参照を回避する。
  */
  onDatasetIdSet (id) {
    if(datasetIds.value.every((datasetId)=>datasetId!==id)){
      datasetIds.value.push(id);
    }else{
      const dataset = datasets.value.find((dataset)=>dataset?.id===id);
      invariant(dataset);
      //datasetsをuseDashboardEditorの入力に渡してuseDashboardEditor内でupdateDefaultPanelNameByDatasetを
      //呼ぶこともできなくはないが、updateDefaultPanelNameByDatasetを呼ぶファイルが２箇所になるのが
      //仕様の管理的に微妙なので、「データセットを読んだらupdateDefaultPanelNameByDatasetを呼ぶ」仕様は
      //このcontainerに寄せてみる。
      updateDefaultPanelNameByDataset(id, dataset.name);
    }
  }
})

//use Query Composable ////////////////////////////////////
const {
  mutate,
} = useUpdateDashboard(updatedDashboard)

//依存関係的に
//defineProps -> useFetchXXXX -> ControllerComposable -> useUpdateXXXX
//という流れになっている

</script>
