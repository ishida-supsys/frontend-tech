<template>
  <el-container>
    <el-header>EnableReactivePropsDesctructure</el-header>
    <el-main>
      <with-default-component />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ElHeader, ElContainer, ElMain } from "element-plus"
import WithDefaultComponent from "@/components/vue/3.3/WithDefaultComponent.vue";
defineOptions({
  name: "EnableReactivePropsDesctructureView",
})
</script>
