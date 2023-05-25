<template>
  <div>{{ visible }}</div>
</template>

<script lang="ts" setup>
import { DialogProps } from "@/composables/vue/3.3/use-dynamic-import-resolving-types"

defineProps<DialogProps>()
</script>
