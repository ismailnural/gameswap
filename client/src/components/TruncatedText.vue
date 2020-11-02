<template>
  <span v-text="truncate(text, length, suffix)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TruncatedText',
  props: {
    text: String,
    length: Number,
    suffix: String,
  },
  methods: {
    truncate(text: string, length = 100, suffix = '...'): string {
      if (text.length > length && length !== -1) {
        return text.substring(0, length) + suffix;
      }
      return text;
    },
  },
});
</script>
