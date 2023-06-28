<template>
  <el-container>
    <el-header>ReferenceVariableInWithDefaults</el-header>
    <el-main>{{ test }}</el-main>
  </el-container>
</template>

<script lang="ts" setup>
//compiler-sfc: support arbitrary expression as withDefaults argument (fe61944), closes #6459
//https://github.com/vuejs/core/issues/6459
import { ElHeader, ElContainer, ElMain } from "element-plus"
import { defaults } from "./ReferenceVariableInWithDefaults/test-ext"
defineOptions({
  name: "ReferenceVariableInWithDefaultsView",
})

withDefaults(defineProps<{
  test: string,
}>(), defaults) //一部だけというのはダメらしい

</script>
