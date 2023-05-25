<template>
  <div v-show="visible">SubPropsComponent {{ hoge }}</div>
</template>

<script lang="ts" setup>
import { BasePropsComponentProps } from './BasePropsComponent.vue';

defineOptions({
  name: "SubPropsComponent",
})
defineProps<BasePropsComponentProps & {
  hoge: string;
}>();
</script>
