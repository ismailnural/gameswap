<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <SwapCard :swap="$store.state.swapDetail" page="detail" v-if="$store.state.swapDetail" />
      </div>
      <div class="col-8">
        sağ
        <div>Swap Detail</div>

        <div>
          {{ $store.state.swapDetail }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SwapsService from '@/services/SwapsService';
import SwapCard from '@/components/SwapCard.vue';

export default defineComponent({
  name: 'SwapDetail',
  components: {
    SwapCard,
  },
  data() {
    return {
      error: null,
    };
  },
  props: {
    swapId: String,
  },
  async mounted() {
    try {
      const swap = await SwapsService.show(this.swapId);
      this.$store.dispatch('setSwapDetail', swap.data);
      document.title = `${swap.data.title} Ücretsiz Takas - GameSwap`;
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
  grid-template-columns: auto auto auto;
}

.card-img-top {
  max-height: 240px;
  width: 100%;
  object-fit: cover;
  object-position: top;
}
</style>
