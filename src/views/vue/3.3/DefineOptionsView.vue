<template>
  <el-container>
    <el-header>DefineOptions</el-header>
    <el-main>...</el-main>
  </el-container>
</template>

<script lang="ts" setup>
//compiler-sfc: add defineOptions macro (#5738) (bcf5841)
//https://github.com/vuejs/core/issues/5738
import { ElHeader, ElContainer, ElMain } from "element-plus"
defineOptions({
  name: "DefineOptionsView",
})
</script>
