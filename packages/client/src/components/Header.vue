<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">GameSwap</router-link>

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
      <div class="navbar-nav mr-auto">
        <router-link :to="{ name: 'Swaps' }" class="nav-link" active-class="active">
          Tüm İlanlar <span class="sr-only">(current)</span>
        </router-link>
        <router-link :to="{ name: 'AddSwap' }" class="nav-link" active-class="active">
          İlan Ekle <span class="sr-only">(current)</span>
        </router-link>
      </div>
      <div class="navbar-nav ml-auto">
        <router-link
          :to="{ name: 'Login' }"
          class="nav-link"
          active-class="active"
          v-if="!$store.state.isUserLoggedIn"
        >
          Giriş <span class="sr-only">(current)</span>
        </router-link>
        <router-link
          :to="{ name: 'Register' }"
          class="nav-link"
          active-class="active"
          v-if="!$store.state.isUserLoggedIn"
        >
          Kayıt <span class="sr-only">(current)</span>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          class="nav-link"
          v-if="$store.state.isUserLoggedIn"
          @click="logout"
        >
          Çıkış <span class="sr-only">(current)</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isUserLoggedIn: this.$store.state.isUserLoggedIn,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>

<style lang="scss"></style>
