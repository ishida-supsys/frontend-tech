<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" router>
        <el-sub-menu index="1">
          <template #title>Vue</template>
          <el-sub-menu index="1-1">
            <template #title>3.3</template>
            <el-menu-item index="1-1-1" route="ConstTypeParameters">ConstTypeParameters</el-menu-item>
            <el-menu-item index="1-1-2" route="DefineOptions">DefineOptions</el-menu-item>
            <el-menu-item index="1-1-3" route="EnableReactivePropsDestructure">EnableReactivePropsDestructure</el-menu-item>
            <el-menu-item index="1-1-4" route="MiscVue3.3">MiscVue3.3</el-menu-item>
            <el-menu-item index="1-1-5" route="ShortEmits">ShortEmits</el-menu-item>
            <el-menu-item index="1-1-6" route="ReferenceVariableInWithDefaults">ReferenceVariableInWithDefaults</el-menu-item>
            <el-menu-item index="1-1-7" route="GetterUsageInReactivityAPIs">GetterUsageInReactivityAPIs</el-menu-item>
            <el-menu-item index="1-1-8" route="DefineSlots">DefineSlots</el-menu-item>
            <el-menu-item index="1-1-9" route="DefineModel">DefineModel</el-menu-item>
            <el-menu-item index="1-1-10" route="ImportedTypesInSFCMacros">ImportedTypesInSFCMacros</el-menu-item>
            <el-menu-item index="1-1-11" route="SuspensibleOption">SuspensibleOption</el-menu-item>
            <el-menu-item index="1-1-12" route="GenericComponents">GenericComponents</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>
