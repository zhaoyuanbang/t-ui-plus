<template>
  <router-link
    :to="to"
    :target="isBlank ? '_blank' : ''"
  >
    <slot></slot>
  </router-link>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'app-link',
    props: {
      to: {
        type: String,
        required: true,
      },
      isBlank: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
