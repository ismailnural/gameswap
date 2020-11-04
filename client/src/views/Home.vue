<template>
  <div class="container">
    <h1 class="page-title">Son Eklenen İlanlar</h1>
    <div v-if="error">
      Takaslar yüklenirken bir hata oluştu!
    </div>
    <div class="swap-list" id="swap-list" v-if="swaps">
      <SwapCard v-for="swap in swaps.data" :key="swap.id" :swap="swap" />
    </div>
    <router-link to="/swaps" class="btn btn-primary btn-lg px-5 my-5" v-if="swaps">
      Tüm İlanlar
    </router-link>
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
      const swaps = await SwapsService.index({ limit: 12 });
      this.$store.dispatch('setSwaps', swaps.data);
    } catch (error) {
      this.error = error.response.data.error;
    }
  },
});
</script>

<style lang="scss" scoped>
.page-title {
  display: inline-block;
  border-bottom: 2px solid #343b3f;
  color: #444;
  margin-bottom: 64px;
  padding: 32px 32px 16px;
  font-weight: bold;
}
.swap-list {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto;

  @media (min-width: 768px) {
    grid-template-columns: auto auto auto;
  }
}
</style>
