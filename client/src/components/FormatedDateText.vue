<template>
  <span v-text="formatDate(date, format)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
  name: 'FormatedDateText',
  props: {
    date: String,
    format: String,
  },
  methods: {
    formatDate(date: string, format = 'DD/MM/YYYY hh:mm'): string {
      return moment(String(date)).format(format);
    },
  },
});
</script>
