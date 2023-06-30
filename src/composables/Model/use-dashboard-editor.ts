/*
# Controller Composable

* DataModel <-> PresentationalModel の変換を行う
* Controller Composable内でQuery Composableは**呼ばない**
  * 分解すると接点の変数はContainerComponentのメンバになりDevToolsに現れるので
    不具合が起きた時の切り分けの難易度が下がる
  * あとUnitTestで同じセットアップを書くのが面倒

*/
//import Presentational Model
//import typeにすると型だけをimportし、Componentの中身はimportされないのでより安全
import type { Props as DashboardEditorProps } from "@/components/vue/Model/Dashboard/DashboardEditor.vue";
//import Data Model
import type { Dashboard } from "./use-dashboard";
import { MaybeRef, computed, ref, unref, watch } from "vue";
import _clonedeep from "lodash.clonedeep"
import { nanoid } from "nanoid";

//define Controller Composable
export const useDashboardEditor = (dashboard?: MaybeRef<Dashboard|undefined>)=>{
  //Presentational Modelの状態変数
  //描画するComponentの階層構造に完全一致する
  const data = ref<DashboardEditorProps>({
    name: "",
    panels: [],
  })

  //Data Model -> Presentational Model の変換
  if(dashboard !== undefined){
    watch(()=>unref(dashboard), (newValue)=>{
      if(newValue){
        data.value = _clonedeep(newValue)
      }
    }, {
      immediate: true,
    })
  }

  //Presentational Model -> Data Model の変換
  const updatedDashboard = computed<Dashboard>(()=>{
    const _dashboard = unref(dashboard)
    return {
      id: _dashboard?.id,
      name: data.value.name,
      panels: data.value.panels.map((panel)=>({
        id: panel.id,
        name: panel.name,
        type: panel.type,
        datasetId: panel.datasetId,
      }))
    }    
  })

  //以降で各Presentational Componentからのイベントを捌くメソッドを並べる
  const addPanel = ()=>{
    data.value.panels.push({
      id: nanoid(),
      name: "newPanel",
      type: "kpi",
      datasetId: undefined,
    })
  }

  return {
    data,
    addPanel,
    updatedDashboard,
  }
}
