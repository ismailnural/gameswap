<template>
  <div :class="['card', passiveCardStyle]">
    <div class="card-body">
      <p class="card-text" v-text="offer?.description" />

      <div class="card-actions" v-if="!isActive">
        <a href="#" class="btn btn-sm btn-outline-secondary">Teklifi Reddet</a>
        <a href="#" class="btn btn-sm btn-success">Teklifi Kabul Et</a>
      </div>
    </div>
    <div class="card-footer">
      <router-link
        :to="{
          name: 'ProfileDetail',
          params: { name: slugUsername, userId: offer.user.id },
        }"
      >
        @{{ offer.user.username }}
      </router-link>
      <FormatedDateText :date="offer.createdAt" :format="dateFormat" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import slug from 'slug';
import FormatedDateText from '@/components/FormatedDateText.vue';
import { DATE_FORMAT, STATUS, STATUS_TEXT } from '@/shared/constants';

export default defineComponent({
  name: 'SwapOfferCard',
  components: {
    FormatedDateText,
  },
  props: {
    offer: Object,
    page: String,
  },
  computed: {
    slugTitle() {
      return this.offer.title ? slug(this.offer.title, { locale: 'tr' }) : 'game';
    },
    slugUsername() {
      return this.offer.user.username ? slug(this.offer.user.username, { locale: 'tr' }) : 'user';
    },
    dateFormat() {
      return DATE_FORMAT;
    },
    status() {
      return STATUS[this.offer.status];
    },
    statusText() {
      return STATUS_TEXT[STATUS[this.offer.status]];
    },
    isActive() {
      return this.status === STATUS[STATUS.ACTIVE];
    },
    passiveCardStyle() {
      return this.isActive ? '' : 'passive';
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
.card-body {
  text-align: left;
  &.card-inner {
    display: grid;
    grid-gap: 1.25rem;
  }
}
.card-footer {
  display: flex;
  font-size: 12px;
  color: #888;
  justify-content: space-between;
  a {
    color: inherit;
  }
}
.card-actions {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  float: right;
  padding-top: 8px;
}
</style>
