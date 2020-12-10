<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-4">
        <SwapCard v-if="swapDetail" :swap="swapDetail" page="detail" />
      </div>
      <div class="col-md-6 col-lg-8">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <router-link
                  :to="{ params: { statusType: '' } }"
                  class="nav-link"
                  active-class="active"
                >
                  Aktif Teklifler
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ params: { statusType: 'passive' } }"
                  class="nav-link"
                  active-class="active"
                >
                  Pasif Teklifler
                </router-link>
              </li>
              <li class="ml-auto">
                <button class="btn btn-outline-success btn-sm" @click="showModalHandler">
                  Teklif Gönder
                </button>
              </li>
            </ul>
          </div>

          <div class="card-body card-inner" v-if="offerList?.pagination?.totalItems">
            <SwapOfferCard v-for="offer in offerList?.data" :key="offer.id" :offer="offer" />
          </div>

          <div class="card-body" v-if="!offerList?.pagination?.totalItems">
            <div class="card">
              <div class="card-body">
                <p
                  class="card-text text-center"
                  v-if="STATUS[$route.params?.statusType?.toUpperCase()] != STATUS.PASSIVE"
                >
                  Bu takasa henüz teklif verilmemiş! <br />İlk teklifi sen ver, şansını arttır.
                  <a class="btn btn-link m-0 p-0" @click="showModalHandler"> Teklif Gönder </a>
                </p>
                <p
                  class="card-text text-center"
                  v-if="STATUS[$route.params?.statusType?.toUpperCase()] == STATUS.PASSIVE"
                >
                  Bu takasın pasif teklifi bulunmuyor! <br />Hemen şimdi bir teklif ver.
                  <a class="btn btn-link m-0 p-0" @click="showModalHandler"> Teklif Gönder </a>
                </p>
              </div>
            </div>
          </div>

          <nav class="pagination justify-content-center" v-if="offerList?.pagination">
            <pagination
              v-model="page"
              :records="offerList.pagination.totalItems"
              :per-page="Number(offerList.pagination.perPage)"
              @paginate="changePage"
              :options="{
                texts: {
                  count: '',
                },
              }"
            />
          </nav>
        </div>
      </div>
    </div>
    <teleport to="body">
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
        zIndexBase="103"
      >
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="showModal = false"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <FormContainer
          title="Takas Teklifi Gönder"
          description="Teklifinizin kabul edilmesi durumunda
          iletişim bilgileriniz ilan sahibi ile paylaşılacaktır..."
          :error="error"
        >
          <Input
            id="description"
            inputType="textarea"
            placeholder="Takas için teklifinizi yazınız"
            required
            v-model="description"
          />
          <div class="btn btn-lg btn-primary btn-block" @click="sendOffer">Gönder</div>
        </FormContainer>
      </vue-final-modal>
    </teleport>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SwapsService from '@/services/SwapsService';
import OffersService from '@/services/OffersService';
import SwapCard from '@/components/SwapCard.vue';
import SwapOfferCard from '@/components/SwapOfferCard.vue';
import Pagination from 'v-pagination-3';
import FormContainer from '@/components/FormContainer.vue';
import Input from '@/components/Input.vue';
import { useToast } from 'vue-toastification';
import { STATUS } from '@/shared/constants';

export default defineComponent({
  name: 'SwapDetail',
  components: {
    SwapCard,
    SwapOfferCard,
    Pagination,
    FormContainer,
    Input,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      isUserLoggedIn: this.$store.state.isUserLoggedIn,
      error: null,
      swapDetail: null,
      page: 1,
      offerList: [],
      description: '',
      showModal: false,
      STATUS,
    };
  },
  props: {
    swapId: String,
    statusType: String,
  },
  methods: {
    async getOffers() {
      const { query, params } = this.$route;
      const statusType = STATUS[params?.statusType?.toUpperCase()] ?? STATUS.ACTIVE;

      try {
        const offers = await OffersService.show(this.swapId, {
          ...query,
          ...params,
          statusType,
        });
        this.offerList = offers.data;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    changePage(page) {
      this.$router.push({
        query: { page },
      });
    },
    async sendOffer() {
      try {
        const response = await OffersService.add({
          swapid: this.swapId,
          description: this.description,
        });
        if (response) {
          this.toast.success('Teklifiniz başarıyla gönderildi!');
          this.$router.push({
            query: { page: 1 },
            params: {
              statusType: '',
            },
          });
          this.showModal = false;
          this.description = '';
        }
      } catch (error) {
        this.toast.error(error.response.data[0].message);
      }
    },
    showModalHandler() {
      // this.description = '';

      if (!this.isUserLoggedIn) {
        this.toast.clear();

        this.toast.error('Teklif gönderebilmek için üye girişi yapmalısın!');
      } else {
        this.showModal = true;
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newProps, oldProps) {
        if (oldProps?.params?.statusType !== newProps?.params?.statusType) {
          this.page = 1;
        }
        if (newProps?.query?.page && oldProps?.query?.page !== newProps?.query?.page) {
          this.page = newProps?.query?.page;
        }
        this.getOffers();
      },
    },
  },
  async mounted() {
    // Takas detayını çek
    try {
      const swap = await SwapsService.show(this.swapId);
      this.swapDetail = swap.data;
      document.title = `${swap.data.title} Ücretsiz Takas - GameSwap`;
    } catch (error) {
      this.error = error.response.data.error;
    }
  },
});
</script>

<style lang="scss" scoped>
.card-body {
  text-align: left;
  &.card-inner {
    display: grid;
    grid-gap: 1.25rem;
  }
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width: 100%;
  max-width: 480px;
}
.close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
