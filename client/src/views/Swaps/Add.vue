<template>
  <FormContainer title="İlan Ekle" description="Lorem ipsum dolar sit amet" :error="error">
    <Input id="title" placeholder="Başlık" required v-model="title" />

    <Input
      id="description"
      inputType="textarea"
      placeholder="Açıklama"
      required
      v-model="description"
    />

    <Input id="coverUrl" placeholder="Görsel Url" required v-model="coverUrl" />

    <Input
      id="platform"
      inputType="select"
      :inputOptions="options"
      placeholder="Platform"
      required
      v-model="platform"
    />

    <div class="btn btn-lg btn-primary btn-block" @click="register">Gönder</div>
  </FormContainer>
</template>

<script>
import { mapState } from 'vuex';
import slug from 'slug';
import SwapsService from '@/services/SwapsService';
import FormContainer from '@/components/FormContainer.vue';
import Input from '@/components/Input.vue';
import { PLATFORMS, PLATFORMS_TEXT } from '@/shared/constants';

export default {
  components: {
    Input,
    FormContainer,
  },
  data() {
    return {
      isUserLoggedIn: this.$store.state.isUserLoggedIn,
      title: '',
      description: '',
      coverUrl: '',
      platform: '-1',
      options: [
        { id: PLATFORMS.WINDOWS, value: PLATFORMS_TEXT[PLATFORMS[PLATFORMS.WINDOWS]] },
        { id: PLATFORMS.MAC, value: PLATFORMS_TEXT[PLATFORMS[PLATFORMS.MAC]] },
        { id: PLATFORMS.PLAYSTATION, value: PLATFORMS_TEXT[PLATFORMS[PLATFORMS.PLAYSTATION]] },
        { id: PLATFORMS.XBOX, value: PLATFORMS_TEXT[PLATFORMS[PLATFORMS.XBOX]] },
        { id: PLATFORMS.OTHER, value: PLATFORMS_TEXT[PLATFORMS[PLATFORMS.OTHER]] },
      ],
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await SwapsService.post({
          title: this.title,
          description: this.description,
          coverUrl: this.coverUrl,
          platform: this.platform,
        });
        this.$router.push({
          name: 'SwapDetail',
          params: { name: slug(response.data.title, { locale: 'tr' }), swapId: response.data.id },
        });
      } catch (error) {
        this.error = error.response.data[0].message;
      }
    },
  },
  async beforeMount() {
    if (!this.isUserLoggedIn) {
      this.$router.replace({
        name: 'Login',
        params: {
          message: 'İlan eklemek için üye girişi yapmalısın!',
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
