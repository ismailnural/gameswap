<template>
  <AuthFormContainer title="Giriş" description="Lorem ipsum dolar sit amet" :error="error">
    <Input id="email" type="email" placeholder="E-mail" required autofocus v-model="email" />

    <Input id="password" type="password" placeholder="Şifre" required v-model="password" />

    <div class="btn btn-lg btn-primary btn-block" @click="login">Gönder</div>
  </AuthFormContainer>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import AuthFormContainer from '@/components/AuthFormContainer.vue';
import Input from '@/components/Input.vue';

export default {
  components: {
    Input,
    AuthFormContainer,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
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
        localStorage.token = JSON.stringify(response.data.token);
        localStorage.user = JSON.stringify(response.data.user);
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
