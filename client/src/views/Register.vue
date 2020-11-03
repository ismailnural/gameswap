<template>
  <AuthFormContainer title="Kayıt" description="Lorem ipsum dolar sit amet" :error="error">
    <Input id="email" type="email" placeholder="E-mail" required autofocus v-model="email" />

    <Input
      id="password"
      type="password"
      placeholder="Şifre"
      required
      v-model="password"
      autocomplete="new-password"
    />

    <Input id="username" placeholder="Kullanıcı Adı" required v-model="username" />

    <Input id="firstname" placeholder="Ad" required v-model="firstname" />

    <Input id="lastname" placeholder="Soyad" required v-model="lastname" />

    <Input id="phone" placeholder="Telefon No." required v-model="phone" />

    <div class="btn btn-lg btn-primary btn-block" @click="register">Gönder</div>
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
      username: '',
      firstname: '',
      lastname: '',
      phone: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'Home',
        });
      } catch (error) {
        this.error = error.response.data[0].message;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
