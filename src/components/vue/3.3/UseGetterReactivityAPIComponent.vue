<template>
  <div>{{ hoge }}</div>
</template>

<script lang="ts" setup>
import { useFeature } from "@/composables/vue/3.3/use-getter-reactivity-apis"
const props = defineProps<{
  huga: string,
}>()

const { hoge } = useFeature(()=>props.huga)
</script>
