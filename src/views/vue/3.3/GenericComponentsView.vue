<template>
  <el-container>
    <el-header>GenericComponents</el-header>
    <el-main>
      <generic-component v-model="hoge" :items="items"/>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElHeader, ElContainer, ElMain } from "element-plus"
import GenericComponent from "@/components/vue/3.3/GenericComponent.vue";
defineOptions({
  name: "GenericComponentsView",
})

const hoge = ref("1")
const items = [
  { label:"1", value:"1" },
  { label:"2", value:"2" },
  { label:"3", value:"3" },
]
</script>
