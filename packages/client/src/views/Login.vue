<template>
  <FormContainer title="Giriş" description="Lorem ipsum dolar sit amet" :error="error">
    <Input id="email" type="email" placeholder="E-mail" required autofocus v-model="email" />

    <Input id="password" type="password" placeholder="Şifre" required v-model="password" />

    <div class="btn btn-lg btn-primary btn-block" @click="login">Gönder</div>

    <router-link :to="{ name: 'Register' }" class="btn btn-link mt-3">
      Kayıt Ol
    </router-link>
  </FormContainer>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import FormContainer from '@/components/FormContainer.vue';
import Input from '@/components/Input.vue';

export default {
  components: {
    Input,
    FormContainer,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  props: {
    message: String,
  },
  async mounted() {
    this.error = this.$route.params.message;
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'Home',
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
