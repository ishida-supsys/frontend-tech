<template>
  <div>
    {{ foo }} {{ bar }}
  </div>
</template>

<script lang="ts" setup>
//compiler-sfc: enable reactive props destructure by default (#7986) (ba9c2ae)
//https://github.com/vuejs/core/issues/7986
defineOptions({
  name: "WithDefaultComponent",
})

const { foo = 1, bar = 'ok' } = defineProps<{ foo?: number, bar?: string }>()
</script>
