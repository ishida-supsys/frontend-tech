<template>
  <el-container>
    <el-header>MiscView3.3View</el-header>
    <el-main>
      <el-form label-position="top">
        <el-form-item label="SupportModuleStringNamesSyntax">
          <el-input v-model="msg" />
        </el-form-item>
        <el-form-item label="ImproveRuntimePropsInterfaceForEnum">
          <enum-props-component :foo="123" />
        </el-form-item>
        <el-form-item label="ConditionalPropertiesComponent">
          <conditional-properties-component 
            size="xl"
            color="normal"
            appearance="outline"
          />
        </el-form-item>
        <el-form-item label="DynamicImportsWhenResolvingTypes">
          <dynamic-imports-component :visible="true" />
        </el-form-item>
        <el-form-item label="ExtractPropTypes">
          still
          <!-- <extract-prop-types-component v-model="extractPropTypesValue" /> -->
        </el-form-item>
        <el-form-item label="hasInjectionContext">
          {{ innerHasInjectionContext }}
        </el-form-item>
        <el-form-item label="ConsoleInTemplate">
          {{ console.log("ConsoleInTemplate") }}
        </el-form-item>
        <el-form-item label="InertAttribute">
          <el-switch v-model="inertValue" inert>Disable</el-switch>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ElSwitch, ElHeader, ElContainer, ElMain, ElForm, ElFormItem, ElInput } from "element-plus"
defineOptions({
  name: "MiscView3.3View",
})

// SupportModuleStringNamesSyntax /////////////////////////////////
//compiler-sfc: support module string names syntax (#7428) (0002567)
//https://github.com/vuejs/core/issues/7428
import { "ref" as ref } from "vue";
const msg = ref('Hello World!')

// ImproveRuntimePropsInterfaceForEnum /////////////////////////////////
//compiler-sfc: improve runtime props inference for enum (eded947)
//https://github.com/vuejs/core/commit/eded94712e37856f258dc8c85f98a26fa41ae05f
import EnumPropsComponent from "@/components/vue/3.3/EnumPropsComponent.vue";

// ConditionalPropertiesComponent /////////////////////////////////
import ConditionalPropertiesComponent from "@/components/vue/3.3/ConditionalPropertiesComponent.vue";

// DynamicImportsWhenResolvingTypes /////////////////////////////////
import DynamicImportsComponent from "@/components/vue/3.3/DynamicImportsComponent.vue";

// ExtractPropTypes /////////////////////////////////
// import ExtractPropTypesComponent from "@/components/vue/3.3/ExtractPropTypesComponent.vue";
// const extractPropTypesValue = ref("aaa")

// hasInjectionContext /////////////////////////////////
import { hasInjectionContext } from "vue";
const innerHasInjectionContext = computed(()=>hasInjectionContext())

// InertAttribute /////////////////////////////////
//compiler-dom: treat inert as boolean attribute (#8209) (918ec8a), closes #8208
//https://github.com/vuejs/core/pull/8209
const inertValue = ref(false)

</script>
