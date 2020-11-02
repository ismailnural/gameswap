<template>
  <div class="card" :class="cardStyle">
    <router-link
      :to="{
        name: 'Swap',
        params: { name: slugTitle, swapId: swap.id },
      }"
    >
      <img
        v-if="swap.coverUrl"
        class="card-img-top"
        :class="page === 'detail' && 'detail-page'"
        :src="swap.coverUrl"
        :alt="swap.title"
      />
      <img
        v-if="!swap.coverUrl"
        class="card-img-top"
        :class="page === 'detail' && 'detail-page'"
        src="../assets/no-cover.png"
        :alt="swap.title"
      />
    </router-link>
    <div class="card-body">
      <h5 class="card-title">
        <router-link
          :to="{
            name: 'Swap',
            params: { name: slugTitle, swapId: swap.id },
          }"
        >
          {{ swap.title }}
        </router-link>
      </h5>
      <p class="card-text profile-info">
        <router-link
          :to="{
            name: 'Swap',
            params: { name: slugTitle, swapId: swap.id },
          }"
        >
          @{{ swap.user.username }}
        </router-link>
        - <FormatedDateText :date="swap.createdAt" :format="dateFormat" />
      </p>
      <p class="card-text">
        <TruncatedText :text="swap.description" :length="page === 'detail' ? -1 : 100" />
      </p>
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
      return slug(this.swap.title, { locale: 'tr' });
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
    cardStyle() {
      return this.status === STATUS[STATUS.ACTIVE] ? 'active' : 'passive';
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  &.passive {
    opacity: 0.4;
  }
}
.card-img-top {
  max-height: 240px;
  width: 100%;
  object-fit: cover;
  object-position: top;

  &.detail-page {
    max-height: none;
  }
}
.profile-info {
  font-size: 14px;
  color: #444;

  a,
  span {
    color: inherit;
    font-size: inherit;
  }
}
</style>
