<template>
  <div>
    hoge<slot hoge="aaa" />
  </div>
</template>

<script lang="ts" setup>
import { VNode } from "vue"
defineSlots<{
  default(props: { hoge: string }): VNode[]
}>()
</script>
