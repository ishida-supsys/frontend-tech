<template>
  <el-container>
    <el-header>VueI18nUsage</el-header>
    <el-main>
      <el-form>
        <el-form-item label="text1">
          {{ t("text1") }}
        </el-form-item>
        <el-form-item label="text2">
          {{ t("common.text2") }}
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ElHeader, ElContainer, ElMain, ElForm, ElFormItem } from "element-plus"
import { useI18n } from "vue-i18n";
defineOptions({
  name: "VueI18nUsage",
})

const { t } = useI18n({ useScope:"local" })

</script>

<i18n lang="yaml">
ja:
  text1: テキスト１
  common:
    text2: テキスト３
</i18n>
