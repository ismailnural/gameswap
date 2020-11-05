<template>
  <div class="container">
    <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Takaslar yüklenirken bir hata oluştu! Lütfen tekrar deneyin.</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="swap-list" id="swap-list" v-if="swaps">
      <SwapCard v-for="swap in swaps.data" :key="swap.id" :swap="swap" />
    </div>
    <router-link :to="{ name: 'Swaps' }" class="btn btn-primary btn-lg px-5 my-5" v-if="swaps">
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
    grid-template-columns: auto auto;
  }
}
.alert {
  margin-bottom: 48px;
}
</style>
