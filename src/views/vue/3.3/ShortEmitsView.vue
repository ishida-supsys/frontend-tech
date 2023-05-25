<template>
  <el-container>
    <el-header>ShortEmits</el-header>
    <el-main>
      <short-emits-component v-model="hoge" />
      <div>{{ hoge }}</div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
//compiler-sfc: codegen support for defineEmits() short syntax (followup of #7992) (ef73ea5)
//https://github.com/vuejs/core/issues/7992
import { ref } from "vue";
import { ElHeader, ElContainer, ElMain } from "element-plus"
import ShortEmitsComponent from "@/components/vue/3.3/ShortEmitsComponent.vue";
defineOptions({
  name: "ShortEmitsView",
})

const hoge = ref("hogehoge")
</script>
