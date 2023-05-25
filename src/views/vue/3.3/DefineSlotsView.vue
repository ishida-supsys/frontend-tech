<template>
  <el-container>
    <el-header>DefineSlots</el-header>
    <el-main>
      <define-slots-component>
        <template #="{ hoge }">
          {{ hoge }}bbb
        </template>
      </define-slots-component>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
//types/slots: support slot presence / props type checks via defineSlots macro and slots option (#7982) (5a2f5d5)
//https://github.com/vuejs/core/issues/7982
import { ElHeader, ElContainer, ElMain } from "element-plus"
import DefineSlotsComponent from "@/components/vue/3.3/DefineSlotsComponent.vue";
defineOptions({
  name: "DefineSlots",
})
</script>
