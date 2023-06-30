<!--
  # Presentional Component

  * 見た目を扱うcomponent
  * 原則props以外の状態変数を持たない・composableを使わない
    scriptタグの中身は大体同じになるはず…
  * イベント名はclick:～やupdate:～などDOMイベント風で、DataModelのことは全く知らないフリをする
  * PresentionalModelがpropsで渡ってくるので特に変換しなくてもtemplateがかける
-->
<template>
  <el-container>
    <el-header>DashboardEditor</el-header>
    <el-main>
      {{ name }}
      <panel-card v-for="panel in panels"
        :key="panel.id"
        :name="panel.name"
        :dataset-id="panel.datasetId"
        :type="panel.type"
      />
    </el-main>
    <el-footer>
      <el-button @click="$emit('click:addPanel')">{{ t("addPanel") }}</el-button>
      <el-button @click="$emit('click:save')">{{ t("save") }}</el-button>
    </el-footer>
  </el-container>
</template>

<i18n>
{
  "ja": {
    "addPanel": "パネルを追加",
    "save": "保存"
  }
}
</i18n>
  
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ElContainer, ElHeader, ElMain, ElFooter, ElButton } from "element-plus";
import PanelCard, { Props as PanelCardProps } from "@/components/vue/Model/Dashboard/DashboardEditor/PanelCard.vue";
//define Presentational Model
export type Props = {
  name: string | undefined;
  panels: (PanelCardProps & { id: string })[];
}

defineOptions({
  name: "DashboardEditor",
})
defineProps<Props>()
defineEmits<{
  (e: "click:addPanel"|"click:save"): void;
}>()

const { t } = useI18n({ useScope:"local" })
</script>
