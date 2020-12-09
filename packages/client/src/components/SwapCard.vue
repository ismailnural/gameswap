<template>
  <div :class="['card', passiveCardStyle, page === 'detail' && 'detail-page']">
    <div class="card-photo">
      <router-link
        :to="{
          name: 'SwapDetail',
          params: { name: slugTitle, swapId: swap.id },
        }"
      >
        <img
          class="card-img"
          :src="swap.coverUrl || require('../assets/no-cover.png')"
          :alt="swap.title"
        />
      </router-link>
    </div>
    <div class="card-body">
      <div class="card-body-top">
        <h4 class="card-title">
          <router-link
            :to="{
              name: 'SwapDetail',
              params: { name: slugTitle, swapId: swap.id },
            }"
          >
            {{ swap.title }}
          </router-link>
        </h4>
        <p class="card-text">
          <TruncatedText :text="swap.description" :length="page === 'detail' ? -1 : 140" />
        </p>
      </div>
      <div class="card-body-bottom">
        <router-link
          :to="{
            name: 'ProfileDetail',
            params: { name: slugUsername, userId: swap.user.id },
          }"
        >
          @{{ swap?.user?.username }}
        </router-link>
        <FormatedDateText :date="swap.createdAt" :format="dateFormat" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import slug from 'slug';
import TruncatedText from '@/components/TruncatedText.vue';
import FormatedDateText from '@/components/FormatedDateText.vue';
import { DATE_FORMAT, STATUS, STATUS_TEXT } from '@/shared/constants';

export default defineComponent({
  name: 'SwapCard',
  components: {
    TruncatedText,
    FormatedDateText,
  },
  props: {
    swap: Object,
    page: String,
  },
  computed: {
    slugTitle() {
      return this.swap.title ? slug(this.swap.title, { locale: 'tr' }) : 'game';
    },
    slugUsername() {
      return this.swap.user.username ? slug(this.swap.user.username, { locale: 'tr' }) : 'user';
    },
    dateFormat() {
      return DATE_FORMAT;
    },
    status() {
      return STATUS[this.swap.status];
    },
    statusText() {
      return STATUS_TEXT[STATUS[this.swap.status]];
    },
    passiveCardStyle() {
      return this.status === STATUS[STATUS.ACTIVE] ? '' : 'passive';
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex: 1;
  text-align: left;
  overflow: hidden;
  flex-direction: column;

  .card-photo {
    position: relative;

    .card-img {
      display: block;
      width: 100%;
      height: auto;
      min-height: auto;
      object-fit: fill;
      object-position: center;
      border-radius: 0;
      background: #f6f6f6;
    }
  }
  .card-body {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 0.6rem;

    .card-body-top {
      flex: 1;
      margin-bottom: 24px;

      a {
        font-weight: bold;
      }
    }
    .card-body-bottom {
      display: flex;
      font-size: 14px;
      color: #888;
      justify-content: space-between;
    }
    a,
    span {
      color: inherit;
      font-size: inherit;
    }
  }

  &.passive {
    opacity: 0.4;
  }
  &.detail-page {
    flex-direction: column;

    .card-photo {
      .card-img {
        width: 100%;
        height: auto;
        min-height: auto;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    .card-photo {
      .card-img {
        width: 160px;
        height: 100%;
        min-height: 200px;
      }
    }
  }
}
</style>
