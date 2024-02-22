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

type UseDashboardEditorOptions = {
  /** データセットIDがセットされた時（初期化時も含む）*/
  onDatasetIdSet?: (datasetId: string)=>void;
}

//define Controller Composable
export const useDashboardEditor = (dashboard?: MaybeRef<Dashboard|undefined>, options?:UseDashboardEditorOptions)=>{
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
        data.value.panels.forEach((panel)=>{
          if(panel.datasetId && options?.onDatasetIdSet){
            options.onDatasetIdSet(panel.datasetId);
          }
        });
      }
    }, {
      immediate: true,
    })
  }

  //Presentational Model -> Data Model の変換
  const updatedDashboard = computed<Dashboard|undefined>(()=>{
    const _dashboard = unref(dashboard)
    if(_dashboard === undefined){
      return undefined;      
    };
    return {
      id: _dashboard.id,
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
      name: undefined,
      type: "kpi",
      datasetId: undefined,
    })
  }

  const updateDefaultPanelNameByDataset = (datasetId: string, name: string)=>{
    //defaultではなく強制的に更新するならfilterを変更する(その場合そもそも設計的に
    //panel.nameを付ける意味がないが…)
    data.value.panels
      .filter((panel)=>panel.datasetId === datasetId && panel.name === undefined)
      .forEach((panel)=>{
        panel.name = name;
      });
  }

  //モデルの中のリストの要素のメンバを更新する戦略
  const updatePanelDatasetId = (panelId: string, datasetId: string)=>{
    const panel = data.value.panels.find((panel)=>panel.id === panelId)
    if(panel){
      panel.datasetId = datasetId;
      if(options?.onDatasetIdSet){
        options.onDatasetIdSet(datasetId);
      }
    }
  }

  return {
    data,
    addPanel,
    updatedDashboard,
    updatePanelDatasetId,
    updateDefaultPanelNameByDataset,
  }
}
