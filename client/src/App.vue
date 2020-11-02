<template>
  <Header />
  <main role="main">
    <router-view />
  </main>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'GameSwap - Ücretsiz Oyun Takas Platformu';
      },
    },
  },
  mounted() {
    if (localStorage.user && localStorage.token) {
      this.$store.dispatch('setToken', JSON.parse(localStorage.token));
      this.$store.dispatch('setUser', JSON.parse(localStorage.user));
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  margin-top: 6rem;
}
</style>
