<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <SwapCard v-if="swapDetail" :swap="swapDetail" page="detail" />
      </div>
      <div class="col-8">
        sağ
        <div>Swap Detail</div>

        <div v-text="swapDetail.description" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
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
  computed: {
    ...mapState(['swapDetail']),
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
