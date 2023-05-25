<template>
  <ul>
    <li>size: {{ size }}</li>
    <li>color: {{ color }}</li>
    <li>appearance: {{ appearance }}</li>
  </ul>
</template>

<script lang="ts" setup>
interface CommonProps {
    size?: 'xl' | 'l' | 'm' | 's' | 'xs';
}

type ConditionalProps = {
    color?: 'normal' | 'primary' | 'secondary';
    appearance?: 'normal' | 'outline' | 'text';
} | {
    color: 'white';
    appearance: 'outline';
};

type Props = CommonProps & ConditionalProps

defineProps<Props>()
</script>
