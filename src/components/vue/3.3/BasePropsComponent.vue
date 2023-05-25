<template>
  <div v-show="visible">BasePropsComponent</div>
</template>

<script lang="ts" setup>
export type BasePropsComponentProps = {
  visible: boolean;
}

defineOptions({
  name: "BasePropsComponent",
})

defineProps<BasePropsComponentProps>();
</script>
