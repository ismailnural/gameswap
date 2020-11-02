<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">GameSwap</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <router-link
          to="/login"
          class="nav-link"
          active-class="active"
          v-if="!$store.state.isUserLoggedIn"
        >
          Giriş <span class="sr-only">(current)</span>
        </router-link>
        <router-link
          to="/register"
          class="nav-link"
          active-class="active"
          v-if="!$store.state.isUserLoggedIn"
        >
          Kayıt <span class="sr-only">(current)</span>
        </router-link>
        <router-link to="/" class="nav-link" v-if="$store.state.isUserLoggedIn" @click="logout">
          Çıkış <span class="sr-only">(current)</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>

<style lang="scss"></style>
