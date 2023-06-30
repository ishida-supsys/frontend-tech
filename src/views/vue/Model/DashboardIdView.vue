<!--
  # View Component

  * views以下のcomponentはrouterのパスの構造と一致するように置く。
  * この時、もしrouterのパスが変更になっても、影響範囲を最小限にしたい。
    このためview componentは１つ以上の(container componentまたはrouter-view)のみ持つ。
  * 感覚的にはコンポーネントではなく、ルーティング設定の一環のようなもの。

  ## router-viewタグを使う場合

  container側でslotを空けてview component内でセットする
  ```vue
  //router-viewが入れ子になっている例
  <template>
    <dashboard-container>
      <router-view />
    </dashboard-container>
  </template>
  ```
  * パラメータの受け取り方はprops・useRouteのどちらでも良い
-->

<template>
  <dashboard-container :id="Number(id)" />
</template>

<script lang="ts" setup>
import DashboardContainer from "@/containers/vue/Model/Dashboard/index.vue"
defineOptions({
  name: "DashboardIdView",
})

//Query Parameterをpropsで受け取る場合
defineProps<{
  id: string; //string[]の可能性があるかだけ不明
}>()

//Query ParameterをuseRouteで受け取る場合
// const route = useRoute();
// const id = computed(()=>route.params.id.toString());

</script>
