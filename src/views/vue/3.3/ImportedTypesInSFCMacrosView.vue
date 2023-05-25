<template>
  <el-container>
    <el-header>ImportedTypesInSFCMacros</el-header>
    <el-main>
      <base-props-component :visible="baseVisible" />
      <sub-props-component 
        :visible="subVisible" 
        hoge="hugahuga"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
//sfc: support imported types in SFC macros (#8083)
//https://github.com/vuejs/core/pull/8083
import { ref } from "vue";
import { ElHeader, ElContainer, ElMain } from "element-plus"
import BasePropsComponent from "@/components/vue/3.3/BasePropsComponent.vue";
import SubPropsComponent from "@/components/vue/3.3/SubPropsComponent.vue";
defineOptions({
  name: "ImportedTypesInSFCMacros",
})

const baseVisible = ref(true);
const subVisible = ref(true);

</script>
