<template>
  <div class="container">
    <div v-if="error">
      Takaslar yüklenirken bir hata oluştu!
    </div>
    <div class="swap-list" id="swap-list" v-if="swapList">
      <SwapCard v-for="swap in swapList?.data" :key="swap.id" :swap="swap" />
    </div>
    <nav class="pagination justify-content-center" v-if="swapList?.pagination">
      <pagination
        v-model="page"
        :records="swapList.pagination.totalItems"
        :per-page="Number(swapList.pagination.perPage)"
        @paginate="changePage"
        :options="{
          texts: {
            count: '',
          },
        }"
      />
    </nav>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SwapCard from '@/components/SwapCard.vue';
import SwapsService from '@/services/SwapsService';
import Pagination from 'v-pagination-3';

export default defineComponent({
  name: 'Swaps',
  components: {
    SwapCard,
    Pagination,
  },
  data() {
    return {
      error: null,
      page: 1,
      swapList: [],
    };
  },
  methods: {
    async changePage(page) {
      const { query } = this.$route;
      const newQuery = { ...query, page };

      try {
        const swaps = await SwapsService.index(newQuery);
        this.swapList = swaps.data;
      } catch (error) {
        this.error = error.response.data.error;
      }
      this.page = page || 1;
      this.$router.push({
        name: 'Swaps',
        query: newQuery,
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        const { query } = route;
        if (!Object.keys(query).length) {
          this.page = 1;
        }
      },
    },
  },
  async mounted() {
    const { query } = this.$route;

    try {
      const swaps = await SwapsService.index(query);
      const { currentPage, lastPage } = swaps.data.pagination;

      if (currentPage > lastPage) {
        const newQuery = {
          ...query,
          page: lastPage,
        };

        const newSwaps = await SwapsService.index(newQuery);
        this.swapList = newSwaps.data;

        this.$router.push({
          name: 'Swaps',
          query: newQuery,
        });

        this.page = Number(newQuery.page);
      } else {
        this.swapList = swaps.data;
        this.page = Number(query.page || 1);
      }
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
    grid-template-columns: auto auto;
  }
}
.pagination {
  margin-top: 64px;
}
</style>
