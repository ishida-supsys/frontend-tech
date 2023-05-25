<template>
  <div>foo: {{ foo }}</div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "EnumPropsComponent",
})

const enum Foo {
  A = 123
}

defineProps<{
  foo: Foo
}>()
</script>
