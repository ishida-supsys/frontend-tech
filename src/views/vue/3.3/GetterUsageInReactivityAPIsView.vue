<template>
  <el-container>
    <el-header>GetterUsageInReactivityAPIs</el-header>
    <el-main>
      <el-input v-model="hoge" />
      <UseGetterReactivityAPIComponent :huga="hoge" />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
//reactivity: improve support of getter usage in reactivity APIs (#7997) (59e8284)
//https://github.com/vuejs/core/issues/7997
import { ref } from "vue"
import { ElHeader, ElContainer, ElMain, ElInput } from "element-plus"
import UseGetterReactivityAPIComponent from "@/components/vue/3.3/UseGetterReactivityAPIComponent.vue";
defineOptions({
  name: "GetterUsageInReactivityAPIsView",
})

const hoge = ref("hogehoge")

</script>
