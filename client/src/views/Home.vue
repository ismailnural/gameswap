<template>
  <div class="container">
    <div v-if="error">
      Takaslar yüklenirken bir hata oluştu!
    </div>
    <div class="swap-list" id="swap-list" v-if="!error">
      <SwapCard v-for="swap in swaps" :key="swap.id" :swap="swap" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import SwapCard from '@/components/SwapCard.vue';
import SwapsService from '@/services/SwapsService';

export default defineComponent({
  name: 'Home',
  components: {
    SwapCard,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapState(['swaps']),
  },
  async mounted() {
    try {
      const swaps = await SwapsService.index();
      this.$store.dispatch('setSwaps', swaps.data);
    } catch (error) {
      this.error = error.response.data.error;
    }
  },
});
</script>

<style lang="scss" scoped>
.swap-list {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto;

  @media (min-width: 768px) {
    grid-template-columns: auto auto auto;
  }
}
</style>
