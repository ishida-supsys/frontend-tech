<template>
  <el-container>
    <el-header>DefineModel</el-header>
    <el-main>
      <define-model-component 
        v-model="hoge" 
        v-model:visible="visible"
      />
      <ul>
        <li>hoge: {{ hoge }}</li>
      </ul>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ElHeader, ElContainer, ElMain } from "element-plus"
import DefineModelComponent from "@/components/vue/3.3/DefineModelComponent.vue";
defineOptions({
  name: "DefineModel",
})

const hoge = ref("")
const visible = ref(false)
</script>
